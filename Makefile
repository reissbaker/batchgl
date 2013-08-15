build/batchgl.js:
	mkdir -p build
	cat \
		lib/index.js \
		lib/context.js \
		lib/program.js \
		lib/attribute.js \
		lib/texture.js \
		lib/uniform.js \
		lib/vertices.js \
		> $@

.PHONY: clean
clean:
	rm -rf build
	mkdir build

.PHONY: build
build: build/batchgl.js

.PHONY: rebuild
rebuild: clean build
