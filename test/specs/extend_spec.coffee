{expect} = chai

describe 'Extension', ->
  describe 'extend', ->
    it 'should make the derived class extend the base class', ->
      Base = ->
      Derived = BatchGL.extend Base, -> Base.call(this)

      derived = new Derived
      expect(derived).to.be.an.instanceof Base
      expect(derived).to.be.an.instanceof Derived

    it 'should call the derived constructor', ->
      Base = ->
      Derived = BatchGL.extend Base, ->
        Base.call(this)
        @test = true

      derived = new Derived
      expect(derived.test).to.be.true

    it 'should copy over class methods', ->
      Base = ->
      Base.test = ->
      Derived = BatchGL.extend Base, -> Base.call(this)
      expect(Derived.test).to.equal(Base.test)

    it 'should generate a constructor method if none is given to extend', ->
      Base = -> @test = true
      Derived = BatchGL.extend Base

      derived = new Derived
      expect(derived.test).to.be.true

    it 'should add methods to prototype if given an object as derived', ->
      Base = ->
      Derived = BatchGL.extend Base,
        test: -> true

      derived = new Derived
      expect(derived.hasOwnProperty('test')).to.not.be.true
      expect(Derived::hasOwnProperty('test')).to.be.true
      expect(derived.test()).to.be.true

  describe '_extendable', ->
    it 'should add an extend() class method that extends the base class', ->
      Base = BatchGL._extendable ->
      Derived = Base.extend -> Base.call(this)

      derived = new Derived
      expect(derived).to.be.an.instanceof Base
      expect(derived).to.be.an.instanceof Derived

    it 'should work with sub-sub-classes', ->
      Base = BatchGL._extendable ->
      Sub = Base.extend -> Base.call(this)
      SubSub = Sub.extend -> Sub.call(this)

      subsub = new SubSub
      expect(subsub).to.be.an.instanceof(Base)
      expect(subsub).to.be.an.instanceof(Sub)
      expect(subsub).to.be.an.instanceof(SubSub)

