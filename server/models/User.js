import mongoose from 'mongoose';
import md5 from 'md5';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import passportLocalMongoose from 'passport-local-mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  number: {
    type: Number,
    required: 'Please supply a phone number',
  },
  gender: {
    type: String,
    required: 'Please supply a gender number',
  },
  picture: {
    type: String

  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  created: {
    	type: Date,
    	default: Date.now
    },
});

userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
