{expect} = chai
{Leaf, Root, Step, Context} = BatchGL
{VertexSetMock, CanvasMock} = BatchGLMocks

step = null
root = null
context = null

describe 'Leaf', ->
  before ->
    canvas = new CanvasMock
    context = new Context(canvas)

  beforeEach ->
    root = new Root(context)
    step = new Step(root)

  describe 'constructor', ->
    it 'should call init', (done) ->
      class Derived extends Leaf
        init: -> done()
      new Derived(step)

    it 'should pass arguments along to init', (done) ->
      class Derived extends Leaf
        init: (parent, data) ->
          expect(data).to.equal(5)
          done()
      new Derived(step, 5)

  describe 'render', ->
    it 'should flush any vertices it knows about', (done) ->
      leaf = new Leaf(step)
      vSet = new VertexSetMock
      vSet2 = new VertexSetMock
      leaf._bufferVertex(vSet)
      leaf._bufferVertex(vSet2)
      leaf.flush = (v) ->
        expect(v).to.equal(vSet)
        leaf.flush = (v) ->
          expect(v).to.equal(vSet2)
          done()

      leaf.render()
