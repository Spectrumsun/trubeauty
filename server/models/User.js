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
  username: {
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
    required: 'Add your Gender',
  },
  picture: {
    type: String,
  },
  pictureID: {
    type: String,
  },
  role: {
    type: String
  },
  emailVerfication: String,
  emailVerficationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  created: {
    	type: Date,
    	default: Date.now
    },
});


userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);


export default mongoose.model('User', userSchema);
