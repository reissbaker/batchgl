* Rename BatchGl -> BatchGL. WebGL / OpenGL / etc always capitalizes the L, so
  whatever might as well follow convention.
* Document the API.
* Draw a sweet diagram and link to it.
* Figure out what you want to do about the Github Page. It's annoying but you
  probably want to generate it from the API docs, and then link to the tests.
  Then you should probably have your `scripts/server` script be renamed to
  something like `scripts/test` and have it open a browser to the `/tests` URL.
