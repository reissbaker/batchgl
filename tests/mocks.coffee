class GlMock
  viewport: ->

class CanvasMock
  constructor: ->
    @width = @height = 0
    @clientHeight = @clientWidth = 10
  getContext: -> new GlMock

class StepMock
  render: ->

class VertexSetMock

window.BatchGLMocks = {GlMock, CanvasMock, StepMock, VertexSetMock}
