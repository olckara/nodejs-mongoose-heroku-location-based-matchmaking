var mongoose = require('mongoose');
mongoose.connect("mongodb://heroku_76gt05rt:@ds137530.mlab.com:37530/heroku_76gt05rt");

module.exports = mongoose;