TESTS = $(shell find test -type f -name "*.test.js")
REPORTER = spec
TIMEOUT = 10000
MOCHA_OPTS =

all: test

install:
	@tnpm install

test: install
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(TESTS)
travis: install
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -t 20000 -r should-http test/*.test.js

.PHONY: test
