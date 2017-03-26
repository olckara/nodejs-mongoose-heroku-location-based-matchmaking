/**
 * Created by karaduman on 25.03.2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../User');

/* This adds user to the database as soon as they sign up */
router.post('/', function (req, res) {
    process_request(req);
    res.sendStatus(200);
});

function process_request(req) { //gathers events data we scraped from users' Facebook info into our database.
    var user_data_raw = req.body;
    console.log("added: " + user_data_raw.name);
    new User({
        facebook_user_id: user_data_raw.id,
        name: user_data_raw.name,
        link: user_data_raw.link,
        gender: user_data_raw.gender,
        age_range_max: user_data_raw.age_range_max,
        profile_picture_uri: user_data_raw.profile_picture_uri,
        email: user_data_raw.email,
        location: {
            city: user_data_raw.location.city,
            country: user_data_raw.location.country,
            loc: [user_data_raw.location.longitude,user_data_raw.location.latitude],
            street: user_data_raw.location.street,
            zip: user_data_raw.location.zip
        },
        friends: [],
        friend_requests: [],
        events: user_data_raw.events //id's of events user attended
    }).save(function (err) {
        if (err) {
            if (err.code === 11000) {
                // 11000 : Error code for duplicate entry with same primary key. Even though we will update the table to fill different events users attended.
                console.log("Duplicate entry for user collection. Skipping entry.")
            }
        } else {
            console.log("done");
        }
    });
}

module.exports = router;
