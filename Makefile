TESTS = $(shell find test -type f -name "*.test.js")
SRC=$(shell find lib -type f -name "*.js")
BUILD = $(subst lib/,build/,$(SRC))
REPORTER = spec
TIMEOUT = 10000
MOCHA_OPTS =

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
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--harmony-generators \
		$(TESTS)
travis: install
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -t 20000 -r should-http test/*.test.js

.PHONY: test
