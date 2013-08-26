{expect} = chai
{Root} = BatchGL
{StepMock} = BatchGLMocks

describe 'Root', ->
  describe 'constructor', ->
    it 'should call init', (done) ->
      class Derived extends Root
        init: -> done()
      new Derived({})

    it 'should pass arguments along to init', (done) ->
      class Derived extends Root
        init: (context, data) ->
          expect(data).to.equal 5
          done()
      new Derived({}, 5)

  describe 'add', ->
    it 'should add the child to the children', ->
      r = new Root({})
      child = {}
      r.add(child)
      expect(r.children[0]).to.equal(child)

    it 'should set the child\'s context', ->
      context = {}
      r = new Root(context)
      child = {}
      r.add(child)
      expect(child.context).to.equal(context)

  describe 'render', ->
    it 'should call the children\'s render methods', ->
      rendered = 0
      class Derived extends StepMock
        @instanceCount = 0

        constructor: -> Derived.instanceCount++
        render: -> rendered++

      a = new Derived
      b = new Derived
      root = new Root

      expect(Derived.instanceCount).to.equal(2)
      root.add(a)
      root.add(b)

      root.render()

      expect(rendered).to.equal(Derived.instanceCount)
