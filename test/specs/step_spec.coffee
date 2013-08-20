{expect} = chai
{Root, Step, Context} = BatchGL
{CanvasMock} = BatchGLMocks

root = null
context = null

describe 'Step', ->
  before ->
    canvas = new CanvasMock
    context = new Context(canvas)
  beforeEach -> root = new Root(context)

  describe 'constructor', ->
    it 'should call init', (done) ->
      class Derived extends Step
        init: -> done()
      new Derived(root)

    it 'should add itself to its parent', ->
      step = new Step(root)
      expect(root.children[0]).to.equal(step)

  describe 'add', ->
    it 'should add its child to its children', ->
      step = new Step(root)
      child = new Step(step)
      expect(step.children[0]).to.equal(child)

    it 'should set its child\'s context', ->
      step = new Step(root)
      child = new Step(step)
      expect(child.context).to.equal(context)

  describe 'render', ->
    it 'should call render on all its children', ->
      rendered = 0
      class Derived extends Step
        render: ->
          super()
          rendered++

      step = new Step(root)
      a = new Derived(step)
      b = new Derived(step)

      root.render()
      expect(rendered).to.equal(2)
