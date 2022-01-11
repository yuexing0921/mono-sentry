export PATH := $(shell pwd)/node_modules/.bin:$(PATH)
.PHONY: init build 

init:
	yarn

build:
	node script/genBuildRelease.js -p $(APP)
	nx run $(APP):build:production --skip-nx-cache
	node script/uploadSourceMap.js -p $(APP)
	rm -rf dist/apps/$(APP)/*.map

