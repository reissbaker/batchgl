{expect} = chai
{Memory} = BatchGL

describe 'Memory', ->
  describe 'constructor', ->
    it 'should take an arrayish and save it as its memory', ->
      m = new Memory([])
      expect(m.memory).to.eql []

  describe 'get', ->
    it 'should get items at the given index', ->
      m = new Memory([1, 2])
      expect(m.get(0)).to.equal 1
      expect(m.get(1)).to.equal 2

  describe 'set', ->
    it 'should set items at the given index', ->
      m = new Memory([1])
      m.set(0, 10)
      expect(m.get(0)).to.equal 10
