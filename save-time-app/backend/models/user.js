const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: Number, trim: true },
  birthDate: { type: Date, trim: true },
  picturePath: { type: String, trim: true },
  versionKey: false
});


userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
//mongoose-unique-validator
