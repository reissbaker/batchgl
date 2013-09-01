{expect} = chai
{Memory, VirtualMemory} = BatchGL

mem = null
clearMemory = -> mem = new Memory([1, 2])

describe 'VirtualMemory', ->
  describe 'get', ->
    beforeEach(clearMemory)

    it 'should get things at the given index', ->
      m = new VirtualMemory(mem, 0)
      expect(m.get(0)).to.equal 1

    it 'should take into account the given offset', ->
      m = new VirtualMemory(mem, 1)
      expect(m.get(0)).to.equal 2

  describe 'set', ->
    beforeEach(clearMemory)

    it 'should set things at the given index', ->
      m = new VirtualMemory(mem, 0)
      m.set(0, 3)
      expect(m.get(0)).to.equal 3

    it 'should take into account the given offset', ->
      m = new VirtualMemory(mem, 1)
      m.set(0, 3)
      expect(m.get(0)).to.equal 3
      expect(m.memory.store[0]).to.equal 1
