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

build/batchgl.min.js: build/batchgl.js
	./node_modules/.bin/uglifyjs \
		-m \
		-c warnings=false,unsafe=true \
		$< > $@

build/batchgl.min.js.gz: build/batchgl.min.js
	gzip -c $< > $@

.PHONY: test
test:
	mkdir -p test/build
	./node_modules/.bin/coffee -o test/build -c test/specs

.PHONY: clean
clean:
	rm -rf build
	mkdir build

.PHONY: build
build: build/batchgl.js build/batchgl.min.js build/batchgl.min.js.gz

.PHONY: rebuild
rebuild: clean build
