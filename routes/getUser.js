/**
 * Created by karaduman on 25.03.2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../User');

/* Request returns nearby users when app sends current long,lat from device GPS */
router.post('/', function (req, res) {
    /*User.find({ loc: { '$near': [ req.body.latitude, req.body.longitude ], '$maxDistance': 1000 } }, function (err, users) {
        var userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        res.send(userMap);
    });*/
    User.find({}, function (err, users) { //returns all users for demo
        var userMap = [];
        var i = 0;
        users.forEach(function (user) {
            userMap.push(user);
        });
        res.send(userMap);
    });
});

module.exports = router;
