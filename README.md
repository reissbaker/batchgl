BatchGl
================================================================================

A library that makes batching WebGL calls easy.

BatchGl models a series of WebGL calls as a tree with vertex data buffered into
the leaves. It renders the tree depth-first, so buffered vertices in leaves
will get batched over together.  Leaves closer to each other will get rendered
more closely to each other, allowing for fewer expensive context switches,
texture buffering, etc.

API
--------------------------------------------------------------------------------

TODO
