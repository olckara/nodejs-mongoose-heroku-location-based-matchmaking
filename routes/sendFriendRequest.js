/**
 * Created by karaduman on 26.03.2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../entities/User');

/* sends friend request to another user to go to an event together */
router.post('/', function (req, res) {
    User.findOneAndUpdate(
        {facebook_user_id: req.body.request_id},
        {$push: {"friend_requests": user_event_raw.sender_id}},
        {safe: true, upsert: true}
    ).exec().then(function () {
        res.sendStatus(200);
    })
});

module.exports = router;