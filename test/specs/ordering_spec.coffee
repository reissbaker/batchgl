{expect} = chai
{VertexSet, Leaf, Root, Step, Context} = BatchGL
{CanvasMock} = BatchGLMocks

leaf = null
step = null
root = null
context = null
count = 0
buffered = []
flushed = false
bufferedCount = 0

class TattletaleVertexSet extends VertexSet
  constructor: (parent) ->
    super(parent)
    @id = count++

class SpyingLeaf extends Leaf
  flush: (v) -> buffered[v.id] = bufferedCount++

class Overlord extends Root
  init: ->
    buffered = []
    flushed = false
    count = 0
    bufferedCount = 0

describe 'Ordering', ->
  before ->
    canvas = new CanvasMock
    context = new Context(canvas)
  beforeEach ->
    root = new Overlord(context)

  it 'should render all buffered vertices', ->
    a = new Step(root)
    b = new Step(root)

    lA0 = new SpyingLeaf(a)
    lA1 = new SpyingLeaf(a)
    lB0 = new SpyingLeaf(b)

    v0 = new TattletaleVertexSet(lA0)
    v1 = new TattletaleVertexSet(lA1)
    v2 = new TattletaleVertexSet(lA1)
    v3 = new TattletaleVertexSet(lB0)

    v0.buffer()
    v1.buffer()
    v2.buffer()
    v3.buffer()

    root.render()

    expect(buffered).to.eql([0, 1, 2, 3])

  it 'should not render unbuffered vertices', ->
    a = new Step(root)
    lA0 = new SpyingLeaf(a)
    v0 = new TattletaleVertexSet(lA0)
    v1 = new TattletaleVertexSet(lA0)

    v0.buffer()
    root.render()

    expect(buffered).to.eql([0])

  it 'should render the graph depth-first', ->
    a = new Step(root)
    b = new Step(root)
    c = new Step(root)

    lC0 = new SpyingLeaf(c)
    lA0 = new SpyingLeaf(a)
    lB0 = new SpyingLeaf(b)
    lA1 = new SpyingLeaf(a)
    lB1 = new SpyingLeaf(b)

    v0 = new TattletaleVertexSet(lB0)
    v1 = new TattletaleVertexSet(lB0)
    v2 = new TattletaleVertexSet(lB1)
    v3 = new TattletaleVertexSet(lA1)
    v4 = new TattletaleVertexSet(lC0)
    v5 = new TattletaleVertexSet(lA1)
    v6 = new TattletaleVertexSet(lA0)

    v0.buffer()
    v1.buffer()
    v2.buffer()
    v3.buffer()
    v4.buffer()
    v5.buffer()
    v6.buffer()

    root.render()

    expect(buffered).to.eql([3,4,5,1,6,2,0])

