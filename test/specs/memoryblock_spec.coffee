{expect} = chai
{MemoryBlock} = BatchGL

describe 'MemoryBlock', ->
  describe 'get', ->
    it 'should get things at the given index', ->
      m = new MemoryBlock([1, 2], 0)
      expect(m.get(0)).to.equal 1

    it 'should take into account the given offset', ->
      m = new MemoryBlock([1, 2], 1)
      expect(m.get(0)).to.equal 2

  describe 'set', ->
    it 'should set things at the given index', ->
      m = new MemoryBlock([1, 2], 0)
      m.set(0, 3)
      expect(m.get(0)).to.equal 3

    it 'should take into account the given offset', ->
      m = new MemoryBlock([1, 2], 1)
      m.set(0, 3)
      expect(m.get(0)).to.equal 3
      expect(m.memory[0]).to.equal 1
