var express = require('express');
var request = require('request');

var router = express.Router();

var base = 'http://localhost:8222';

router.get('/', function(req, res, next) {
    'use strict';

    var context = {
        title: 'NATS.io monitor'
    };

    // varz
    request(base + '/varz', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            context.varz = JSON.parse(body);

            // connz
            request(base + '/connz', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    context.connz = JSON.parse(body);

                    res.render('index', context);
                } else {
                    next(error);
                }
            });

        } else {
            next(error);
        }
    });
});

module.exports = router;
