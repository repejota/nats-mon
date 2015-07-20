all:
	./node_modules/.bin/gulp default

clean:
	./node_modules/.bin/gulp clean

dist-clean:
	./node_modules/.bin/gulp dist-clean

lint: lint
	#./node_modules/.bin/gulp jshint
	./node_modules/.bin/gulp csslint

.PHONY: all clean dist-clean lint
