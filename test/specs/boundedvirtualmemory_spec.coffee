{expect} = chai
{BoundedVirtualMemory, Memory} = BatchGL

mem = null
clearMemory = -> mem = new Memory([1, 2, 3])

describe 'BoundedVirtualMemory', ->
  describe 'get', ->
    beforeEach(clearMemory)

    it 'should get things at the given index', ->
      m = new BoundedVirtualMemory(mem, 0, 1)
      expect(m.get(0)).to.equal 1

    it 'should take into account the offset', ->
      m = new BoundedVirtualMemory(mem, 1, 1)
      expect(m.get(0)).to.equal 2

    it 'should throw if you go before the start', ->
      m = new BoundedVirtualMemory(mem, 1, 1)
      err = null
      try
        m.get(-1)
      catch e
        err = e
      expect(err).to.not.equal null

    it 'should throw if you go after the end', ->
      m = new BoundedVirtualMemory(mem, 0, 1)
      try
        m.get(1)
      catch e
        err = e
      expect(err).to.not.equal null

  describe 'set', ->
    beforeEach(clearMemory)

    it 'should set things at the given index', ->
      m = new BoundedVirtualMemory(mem, 0, 1)
      m.set(0, 10)
      expect(m.get(0)).to.equal 10

    it 'should take into account the offset', ->
      m = new BoundedVirtualMemory(mem, 1, 1)
      m.set(0, 10)
      expect(m.get(0)).to.equal 10
      expect(m.memory.store[0]).to.equal 1

    it 'should throw if you go before the start', ->
      m = new BoundedVirtualMemory(mem, 1, 1)
      err = null
      try
        m.set(-1, 10)
      catch e
        err = e
      expect(err).to.not.equal null

    it 'should throw if you go after the end', ->
      m = new BoundedVirtualMemory(mem, 0, 1)
      try
        m.set(1, 10)
      catch e
        err = e
      expect(err).to.not.equal null
