// Load required packages
var passport = require('passport');
// var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');
var DigestStrategy = require('passport-http').DigestStrategy;


// passport.use(new BasicStrategy(
//   function(username, password, callback) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return callback(err); }
//
//       // No user found with that username
//       if (!user) { return callback(null, false); }
//
//       // Make sure the password is correct
//       user.verifyPassword(password, function(err, isMatch) {
//         if (err) { return callback(err); }
//
//         // Password did not match
//         if (!isMatch) { return callback(null, false); }
//
//         // Success
//         return callback(null, user);
//       });
//     });
//   }
// ));

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

exports.isAuthenticated = passport.authenticate(['digest', 'bearer'], { session : false });
