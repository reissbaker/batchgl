{expect} = chai
{VertexSet, Leaf, Root, Step, Context} = BatchGL
{CanvasMock} = BatchGLMocks

leaf = null
step = null
root = null
context = null

describe 'VertexSet', ->
  before ->
    canvas = new CanvasMock
    context = new Context(canvas)

  beforeEach ->
    root = new Root(context)
    step = new Step(root)
    leaf = new Leaf(step)

  describe 'buffer', ->
    beforeEach ->
      leaf.buffer = ->
      leaf.flush = ->
    it 'should buffer the set into the parent leaf', (done) ->
      buffered = false
      v = new VertexSet(leaf)
      v.buffer()
      leaf.flush = (set) ->
        expect(set).to.equal(v)
        buffered = true
        done()
      leaf.render()

