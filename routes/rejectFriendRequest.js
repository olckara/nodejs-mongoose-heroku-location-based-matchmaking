/**
 * Created by karaduman on 26.03.2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../entities/User');

/* sends friend request to another user to go to an event together */
router.post('/', function (req, res) {
    User.update(
        {facebook_user_id: req.body.sender_id},
        { $pullAll: {uid: [req.params.request_id]}}
        ).exec().then(function () {
            res.sendStatus(200);
        })
});

module.exports = router;