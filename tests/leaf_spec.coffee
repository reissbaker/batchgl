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
    it 'should buffer any vertices it knows about', (done) ->
      leaf = new Leaf(step)
      vSet = new VertexSetMock
      vSet2 = new VertexSetMock
      leaf._bufferVertex(vSet)
      leaf._bufferVertex(vSet2)
      leaf.buffer = (v) ->
        expect(v).to.equal(vSet)
        leaf.buffer = (v) ->
          expect(v).to.equal(vSet2)
          done()

      leaf.render()

    it 'should flush if vertices were buffered', (done) ->
      leaf = new Leaf(step)
      vSet = new VertexSetMock
      leaf._bufferVertex(vSet)
      leaf.flush = -> done()
      leaf.render()

    it 'shouldn\'t flush it vertices weren\'t buffered', (done) ->
      leaf = new Leaf(step)
      leaf.flush = -> done()
      done()
      leaf.render() # will cause double-done error if it flushes

