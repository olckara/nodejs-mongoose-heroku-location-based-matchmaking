/**
 * Created by karaduman on 25.03.2017.
 */
var express = require('express');
var router = express.Router();
var Event = require('../entities/Event');

/* This adds events user attended to our database as soon as they sign up */
router.post('/', function (req, res) {
    process_request(req);
    res.sendStatus(200);
});

function process_request(req) { //gathers events data we scraped from users' Facebook info into our database.
    var user_event_raw = req.body;
    console.log(user_event_raw.events.length);
    console.log("process request");
    for (var i = 0; i < user_event_raw.events.length; i++) {
        (function () {
            var id = user_event_raw.events[i].id;
            if ("place" in user_event_raw.events[i] && "location" in user_event_raw.events[i].place) {
            //If event has place information and that place information has location info.
                console.log("added: " + user_event_raw.events[i].name);
                new Event({
                    facebook_event_id: user_event_raw.events[i].id,
                    name: user_event_raw.events[i].name,
                    place: {
                        facebook_place_id: user_event_raw.events[i].place.id,
                        name: user_event_raw.events[i].place.name,
                        location: {
                            city: user_event_raw.events[i].place.location.city,
                            country: user_event_raw.events[i].place.location.country,
                            loc: [user_event_raw.events[i].place.location.longitude,user_event_raw.events[i].place.location.latitude],
                            street: user_event_raw.events[i].place.location.street,
                            zip: user_event_raw.events[i].place.location.zip
                        }
                    },
                    rsvp_status: user_event_raw.events[i].rsvp_status,
                    start_time: user_event_raw.events[i].start_time,
                    end_time: user_event_raw.events[i].end_time,
                    description: user_event_raw.events[i].description,
                    users: [user_event_raw.facebook_user_id]
                }).save(function (err) {
                    if (err) {
                        if (err.code === 11000) {
                        // 11000 : Error code for duplicate entry with same primary key. Even though we will update the table to fill different users who attend same event
                            Event.findOneAndUpdate(
                                {facebook_event_id: id},
                                {$push: {"users": user_event_raw.facebook_user_id}},
                                {safe: true, upsert: true}
                            )
                        }
                    } else {
                        //console.log("done");
                    }
                });
            } else {
                console.log("This event has no place information. That's why we cannot use it.");
            }
        })();
    }
}

module.exports = router;
