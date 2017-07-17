var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');
var basicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');


passport.use('basic', new basicStrategy(
  function(username, password, done) {
     User.findOne({username: username}, function(err, user){
       if(err) throw err;
       if(user && bcrypt.compareSync(password, user.password)){
         return done(null, User);
       }
       return done(null, false);
     });
  }));



// add new user

  const user =  User.find({}, function(err, users){
    if (users.length == 0) {

      var newUser = new User({
        username: "paradegoat",
        password: "password"
      });

      newUser.save().then(function() {
        console.log("user added");
      }).catch(function(err){
        console.log('error');
        console.log(err);
      });
    }
  });

module.exports = router;
