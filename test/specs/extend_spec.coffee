{expect} = chai

describe 'Extension', ->
  describe 'extend', ->
    it 'should make the derived class extend the base class', ->
      Base = ->
      Derived = BatchGL.extend Base, {}

      derived = new Derived
      expect(derived).to.be.an.instanceof Base
      expect(derived).to.be.an.instanceof Derived

    it 'should call the derived constructor', ->
      Base = ->
      Derived = BatchGL.extend Base,
        constructor: ->
          Base.call(this)
          @test = true

      derived = new Derived
      expect(derived.test).to.be.true

    it 'should copy over class methods', ->
      Base = ->
      Base.test = ->
      Derived = BatchGL.extend Base, {}
      expect(Derived.test).to.equal(Base.test)

    it 'should generate a constructor method if none is given', ->
      Base = -> @test = true
      Derived = BatchGL.extend Base, {}

      derived = new Derived
      expect(derived.test).to.be.true

    it 'should add methods to prototype', ->
      Base = ->
      Derived = BatchGL.extend Base,
        test: -> true

      derived = new Derived
      expect(derived.hasOwnProperty('test')).to.not.be.true
      expect(Derived::hasOwnProperty('test')).to.be.true
      expect(derived.test()).to.be.true

