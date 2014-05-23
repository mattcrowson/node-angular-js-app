var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema= new Schema({
  email: String,
  password: String
});

userSchema.methods.validPassword = function(password) {
    return password === this.password;
};

module.exports = mongoose.model('User', userSchema);