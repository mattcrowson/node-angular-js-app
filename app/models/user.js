var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema= new Schema({
    local: {
        email: String,
        password: String
    }
});

userSchema.methods.validPassword = function(password) {
    return password === this.local.password;
};

module.exports = mongoose.model('User', userSchema);