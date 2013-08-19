BatchGl
================================================================================

A library that makes batching WebGL calls easy.

BatchGl models a series of WebGL calls as a tree. It renders the tree
depth-first, so any buffered vertices in a specific leaf of the tree will get
batched over together. Leaves closer to each other will get rendered more
closely to each other, allowing for fewer expensive context switches, texture
buffering, etc.

API
--------------------------------------------------------------------------------

TODO
