var should = require("should");

describe('Common', function() {
    "use strict";

    it('has a version', function() {
        var version = require('../../package.json').version;
        should.equal(version, version);
    });
});
