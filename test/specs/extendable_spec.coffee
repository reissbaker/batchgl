{expect} = chai
{Extendable} = BatchGL

describe 'Extendable', ->
  describe '.extend', ->
    it 'should exist', ->
      expect(Extendable.extend).to.be.a 'function'
    it 'should extend classes when called', ->
      Derived = Extendable.extend {}
      d = new Derived
      expect(d).to.be.an.instanceof Derived
      expect(d).to.be.an.instanceof Extendable
  describe '.init', ->
    it 'should be called in the constructor', (done) ->
      Derived = Extendable.extend
        init: -> done()
      d = new Derived
    it 'should be passed any constructor arguments', (done) ->
      Derived = Extendable.extend
        init: (data) ->
          expect(data).to.equal 5
          done()
      d = new Derived(5)
