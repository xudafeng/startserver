SRC=$(shell find lib -type f -name "*.js")
BUILD = $(subst lib/,build/,$(SRC))
REPORTER = spec
git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm install
build/%.js: lib/%.js
	${npm_bin}/regenerator --include-runtime $< > $@
build: clean
	@cp -rf lib build
	@find build -type f -name "*.js" | xargs rm
	@$(MAKE) $(BUILD)
publish: build
	@npm publish
pull:
	@git pull origin ${git_version}
push:
	@git push origin ${git_version}
clean:
	@rm -rf build
test: install build
	@node --harmony \
		${npm_bin}/istanbul cover ${npm_bin}/_mocha \
		-- \
		--timeout 10000 \
		--require co-mocha
travis: install
	@NODE_ENV=test ${npm_bin}/istanbul cover \
		${npm_bin}/_mocha \
		--report lcovonly \
		-- -t 20000 -r should-http test/*.test.js
jshint:
	@${npm_bin}/jshint .
.PHONY: test
