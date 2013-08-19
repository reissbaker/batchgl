{Context} = BatchGl
{expect} = chai
{GlMock, CanvasMock} = BatchGlMocks



describe 'Context', ->
  describe 'constructor', ->
    it 'should call getContext on the canvas provided', (done) ->
      canvas = new CanvasMock
      canvas.getContext = (args...) ->
        value = CanvasMock::getContext.apply(this, args)
        done()
        value
      new Context(canvas)

    it 'should set its gl object to the object returned from getContext', ->
      canvas = new CanvasMock
      context = new Context(canvas)
      expect(context.gl).to.be.an.instanceof(GlMock)

  describe 'updateSize', ->
    it 'should update the height and width based on the client', ->
      canvas = new CanvasMock
      context = new Context(canvas)
      expect(canvas.height).to.not.equal(canvas.clientHeight)
      expect(canvas.width).to.not.equal(canvas.clientWidth)

      context.updateSize()

      expect(canvas.height).to.equal(canvas.clientHeight)
      expect(canvas.width).to.equal(canvas.clientWidth)
