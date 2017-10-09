TSLINT      = ./node_modules/.bin/tslint
SRC         = $(shell find . -name "*.ts" -not -path './node_modules/*')
BUILD_FILES = $(shell find build -name "*.js")
MOCHA       = ./node_modules/.bin/mocha -t 1000 --harmony

.PHONY: build
build:
	./node_modules/.bin/tsc

.PHONY: test
test: build
	$(MOCHA) $(BUILD_FILES)

.PHONY: lint
lint:
	$(TSLINT) $(SRC)

.PHONY: fix
fix:
	$(TSLINT) --fix $(SRC)

.PHONY: clean
clean:
	@rm -rf build/*;
	@find . -name "*.log" | xargs rm;
	@find . -name .DS_Store | xargs rm;
	@rm -f project.sublime-workspace
	@rm -f npm-debug.log

.PHONY: setup
setup:
	npm install
