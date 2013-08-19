{expect} = chai
{VertexSet, Leaf, Root, Step, Context} = BatchGl
{CanvasMock} = BatchGlMocks

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

  describe 'constructor', ->
    it 'should set any vertices passed in', ->
      vertices = [0, 0]
      v = new VertexSet(leaf, vertices)
      expect(v.vertices).to.be.an.instanceof(Float32Array)
      expect(v.vertices[0]).to.equal(0)
      expect(v.vertices[1]).to.equal(0)
      expect(v.vertices.length).to.equal(2)
    it 'should not require vertices to be passed in', ->
      v = new VertexSet(leaf)

  describe 'setVertices', ->
    it 'should set vertices passed in', ->
      vertices = [1, 2]
      v = new VertexSet(leaf)
      v.setVertices(vertices)
      expect(v.vertices).to.be.an.instanceof(Float32Array)
      expect(v.vertices[0]).to.equal(1)
      expect(v.vertices[1]).to.equal(2)
      expect(v.vertices.length).to.equal(2)

  describe 'buffer', ->
    beforeEach ->
      leaf.buffer = ->
      leaf.flush = ->
    it 'should buffer the set into the parent leaf', (done) ->
      buffered = false
      v = new VertexSet(leaf)
      v.buffer()
      leaf.buffer = (set) ->
        expect(set).to.equal(v)
        buffered = true
      leaf.flush = ->
        expect(buffered).to.be.true
        done()
      leaf.render()

