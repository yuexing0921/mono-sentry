export PATH := $(shell pwd)/node_modules/.bin:$(PATH)
.PHONY: init build 

init:
	yarn

build:
	node script/genBuildRelease.js -e $(ENV) -p $(APP)
	nx run $(APP):build:$(ENV) --skip-nx-cache
	node script/uploadSourceMap.js -e $(ENV) -p $(APP)
	rm -rf dist/apps/$(APP)/**/*.map
	rm -rf dist/apps/$(APP)/.next/**/**/*.map

