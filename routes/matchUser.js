/**
 * Created by karaduman on 26.03.2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../User');

/* Request returns nearby users when app sends current long,lat from device GPS */
router.post('/', function (req, res) {
    var list_of_events = [];
    User.find({facebook_user_id : req.user_id},{events:1}, function (err,doc) {
        doc.forEach(function (event) {
            list_of_events.push(event); // collecting every event user ever attended.
        })
    });
    var list_of_users = [];
    Event.find({facebook_event_id: list_of_events},{users:1},function (err,doc) {
        doc.forEach(function (users) { //getting users array of every event
            users.forEach(function (user) { //getting users one by one
                list_of_users.push(user); // collecting other users attended the same events.
            });
        });
    })
});

module.exports = router;