// Load required packages
var passport = require('passport');
var User = require('../models/user');
var DigestStrategy = require('passport-http').DigestStrategy;

passport.use(new DigestStrategy(
  { qop: 'auth' },
  function(username, callback) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Success
      return callback(null, user, user.password);
    });
  },
  function(params, callback) {
    // validate nonces as necessary
    callback(null, true);
  }
));

exports.isAuthenticated = passport.authenticate('digest', { session : false });
