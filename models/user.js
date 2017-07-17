var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/stats');


var UserSchema = mongoose.Schema({
    username: {
      type: String,
      index: true
    },
    password: {
      type: String
    }

});

UserSchema.pre('save', function(next){
  var hash = bcrypt.hashSync(this.password, 8);
  next();
})

var User = module.exports = mongoose.model('User', UserSchema, 'Users')
