/**
 * Created by karaduman on 26.03.2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../entities/User');

/* Gets all friend request user have been taken */
router.post('/', function (req, res) {
    User.find({facebook_user_id:req.body.id},{friend_requests:1}, function (err, users) { //returns all users for demo
        var userMap = [];
        users.forEach(function (user) {
            userMap.push(user);
        });
        res.send(userMap);
    });
});

module.exports = router;