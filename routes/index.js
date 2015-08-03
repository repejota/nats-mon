var config = require('../config.json');
var express = require('express');
var request = require('request');

var router = express.Router();

var base = config.monitor;

router.get('/api/connz', function(req, res, next) {
    'use strict';
    request(base + '/connz', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));
        } else {
            next(error);
        }
    });
});

router.get('/api/varz', function(req, res, next) {
    'use strict';
    request(base + '/varz', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));
        } else {
            next(error);
        }
    });

});

router.get('/', function(req, res, next) {
    'use strict';
    var context = {
        title: 'NATS.io monitor'
    };
    res.render('index', context);

});

module.exports = router;
