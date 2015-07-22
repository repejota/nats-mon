all:
	./node_modules/.bin/gulp default

clean:
	./node_modules/.bin/gulp clean

dist-clean:
	./node_modules/.bin/gulp dist-clean

lint: lint
	#./node_modules/.bin/gulp jshint
	./node_modules/.bin/gulp csslint

test:
	./node_modules/.bin/mocha test/unit

uitest:
	./node_modules/.bin/casperjs test test/ui/suite.js

.PHONY: all clean dist-clean lint uitest test
