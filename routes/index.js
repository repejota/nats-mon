var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function(req, res, next) {
    var context = {
        title: 'NATS.io monitor'
    };
    request('http://localhost:8222/varz', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            context.varz = JSON.parse(body);
            res.render('index', context);
        } else {
            next(error);
        }
    });
});

module.exports = router;
