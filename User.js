/**
 * Created by karaduman on 25.03.2017.
 */
var mongoose = require('./database');

UserSchema = mongoose.Schema(
    {
        facebook_user_id:Number,
        name:String,
        link:String,
        gender:String,
        age_range_max:Number,
        profile_picture_uri:String,
        email:String,
        location: { //location.location
            city: String,
            country: String,
            loc: { type: [Number], index: '2dsphere' },
            street: String,
            zip: String
        },
        friends: [Number],
        friend_requests: [Number],
        events : [Number] //id's of events user attended

    },
    { collection: 'users' });
UserSchema.index({ facebook_user_id: 1 }, { unique: true });
User = mongoose.model('User', UserSchema);

module.exports = User;