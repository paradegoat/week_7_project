const session = require('express-session');
const passport = require('passport');
const path = require('path');
const express = require('express');
const expressValidator = require('express-validator');
const userVal = require('./routes/userVal');
const Activity = require('./models/activitySchema.js'); // Load schema
// const basicStrategy = require('passport-http').BasicStrategy;
// const bcrypt = require('bcryptjs');


const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/stats', {useMongoClient: true});


//view engine for auth
app.set('views', './views');
//view engine for auth

app.use(express.static('public'));

//express session
// app.use(session({
//   secret: 'parade goat',
//   saveUninitialized: true,
//   resave: true
// }));

app.use(expressValidator());
//passport init
app.use(passport.initialize());
app.use(passport.session());
//passport init


// app.use('/', routes);
// app.use('/userVal', userVal);
//


app.get('/api/auth', passport.authenticate('basic', {session: false}), function(req, res){
console.log('it worked');
  res.redirect('/api/activities')
})

  app.get('/api/activties', passport.authenticate('basic', {session: false}), function(req, res) {
    Activity.find().then(function(activity){
      res.json(activity)
    }).catch(function(err){
      return console.log(err);
    });
  });


  app.post('/api/activties', passport.authenticate('basic', {session: false}), function(req, res) {
    Activity.create({
      activity: req.body.activity,
      rep: req.body.rep
    }).then(activity =>{
      res.redirect('/api/activities')
    });
  });


  app.get('/api/activties/:id', passport.authenticate('basic', {session: false}), function(req, res){
    Activity.findById(req.params.id).then(function(activity){
      res.json(activity);
    });
  });

  app.put('/api/activies/:id', passport.authenticate('basic', {session: false}), function(req, res) {
    Activity.findOneAndUpdate({
      activity: req.body.activity,
      rep: req.body.rep,
    }).then(activity =>{
      res.json(activity)
    });
  });

  app.delete('/api/activies/:id', passport.authenticate('basic', {session: false}), function(req, res) {
    Activity.findOneAndRemove({
      activity: req.body.activity,
      rep: req.body.rep,
    }).then(activity =>{
      res.json(activity)
    });
  })


  app.post('/api/activties/:id/stats', passport.authenticate('basic', {session: false}), function(req, res) {
    Activity.findOneAndUpdate({
      activity: req.body.activity,
      rep: req.body.rep,
    }).then(activity =>{
      res.json(activity)
    });
  });

  app.delete('/api/stats/:id', passport.authenticate('basic', {session: false}), function(req, res) {
    Activity.findOneAndRemove({
      activity: req.body.activity,
      rep: req.body.rep,
    }).then(activity =>{
      res.json(activity)
    });
  });

app.listen(3000, function(){
  console.log("App is live")
});
