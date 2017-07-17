const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema({
      activity: {type: String, required: true},
      rep: {type: Number, required: true},
      date: {type: Date, default: Date.now}
      })


const Activity = mongoose.model('Activities', activitySchema, 'Activities');

module.exports = Activity





// adding new activity to db


const activity =  Activity.find({}, function(err, activity){
  if (activity.length == 0) {
    var newActivity = new Activity({
      activity: "test",
      rep: "20"

    });

    newActivity.save().then(function() {
      console.log("activity added");
    }).catch(function(err){
      console.log('error');
      console.log(err);
    });
  }
});
