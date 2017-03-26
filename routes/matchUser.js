/**
 * Created by karaduman on 26.03.2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../User');
var Event = require('../Event');

/* Request returns nearby users when app sends current long,lat from device GPS */
router.post('/', function (req, res) {
    var list_of_events = [];
    User.find({facebook_user_id: req.body.user_id}, {events: 1}, function (err, doc) {
        doc.forEach(function (event) {
            list_of_events.push(event); // collecting every event user ever attended.
        })
    });
    var list_of_users = [];
    Event.find({facebook_event_id: list_of_events}, {users: 1},
        function (err, doc) {
            doc.forEach(function (users) { //getting users array of every event
                list_of_users.concat(users); //collecting data of every user we've been attended same event
            });
        });
    User.find({
            facebook_user_id: list_of_users, //find users we've been together which are nearby
            loc: {
                '$near': [req.body.latitude, req.body.longitude],
                '$maxDistance': 1000
            }
        },
        function (err, users) {
            var userMap;
            userMap = users.map(function(user) { return user.facebook_user_id; });
            res.send(userMap);
        });
});

module.exports = router;