build/batchgl.js:
	mkdir -p build
	cat \
		lib/index.js \
		lib/context.js \
		lib/root.js \
		lib/step.js \
		lib/leaf.js \
		lib/vertices.js \
		> $@

.PHONY: test
test:
	./bower_components/coffee-script/bin/coffee -c tests/

.PHONY: clean
clean:
	rm -rf build
	mkdir build

.PHONY: build
build: build/batchgl.js

.PHONY: rebuild
rebuild: clean build
