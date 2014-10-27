SRC=$(shell find lib -type f -name "*.js")
BUILD = $(subst lib/,build/,$(SRC))
REPORTER = spec

all: test
install:
	@npm install
build/%.js: lib/%.js
	./node_modules/.bin/regenerator --include-runtime $< > $@
build: clean
	@cp -rf lib build
	@find build -type f -name "*.js" | xargs rm
	@$(MAKE) $(BUILD)
publish: build
	@npm publish
clean:
	@rm -rf build
test: install build
	@node --harmony \
		node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \
		-- \
		--reporter spec \
		--timeout 10000 \
		--require co-mocha
travis: install
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -t 20000 -r should-http test/*.test.js
.PHONY: test
