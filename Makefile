all:
	./node_modules/.bin/gulp default

clean:
	./node_modules/.bin/gulp clean

dist-clean:
	./node_modules/.bin/gulp dist-clean

lint:
	./node_modules/.bin/gulp jshint
	./node_modules/.bin/gulp csslint

test:
	./node_modules/.bin/mocha test/unit

uitest:
	./node_modules/.bin/casperjs test test/ui/suite.js

cover:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha test/unit -- -R spec
	./node_modules/.bin/gulp coveralls

docker:
	docker build -t nats-mon .

serve:
	npm start

serve-dev:
	npm run-script start-dev

.PHONY: all clean dist-clean lint uitest test
