/**
 * Created by karaduman on 25.03.2017.
 */
var mongoose = require('./database');

EventSchema = mongoose.Schema(
    {
        facebook_event_id: Number,
        name: String,
        place: {
            facebook_place_id: Number,
            name: String,
            location: {
                city: String,
                country: String,
                loc: { type: [Number], index: '2dsphere' },
                street: String,
                zip: String
            }
        },
        start_time: Date,
        end_time: Date,
        description:String,
        users: [Number]
    });
EventSchema.index({ facebook_event_id: 1 }, { unique: true });
Event = mongoose.model('Event', EventSchema);

module.exports = Event;