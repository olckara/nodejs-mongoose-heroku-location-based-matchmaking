/**
 * Created by karaduman on 26.03.2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../entities/User');

/* sends friend request to another user to go to an event together */
router.post('/', function (req, res) {
    var conditions = {
        facebook_user_id: req.body.user.facebook_user_id,
        friend_requests: {$eq: req.user.id},
        friends: {$ne: req.user.id}
    };

    var update = {
        $pop: {friend_requests: { _id: req.user.id}},
        $addToSet: {friends: req.user.id}
    };
    User.findOneAndUpdate(conditions,update).exec().then(function () {
        res.sendStatus(200);
    })
});

module.exports = router;