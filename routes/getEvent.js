/**
 * Created by karaduman on 25.03.2017.
 */
var express = require('express');
var router = express.Router();
var Event = require('../Event');

/* This returns nearby events when app sends current long,lat from device GPS */
router.post('/', function (req, res) {
    /*Event.find({loc: {'$near': [req.body.latitude, req.body.longitude], '$maxDistance': 1000}}, function (err, events) {
        var eventMap = {};
        if ("length" in events) {
            events.forEach(function (event) {
                eventMap[event._id] = event;
            });
        }

        res.send(eventMap);
    });*/
    Event.find({}, function (err, events) {
        var eventMap = {};
        if ("length" in events) {
            events.forEach(function (event) {
                eventMap[event._id] = event;
            });
        }

        res.send(eventMap);
    });
});

module.exports = router;
