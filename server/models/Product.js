import mongoose from 'mongoose';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  category:{
    type: String,
    lowercase: true,
    trim: true,
  },
  productname: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true
  },
  price: {
    type: Number,
    trim: true
  },
  picture: {
    type: String,
  },
  pictureID: {
    type: String,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    	type: Date,
    	default: Date.now
    },
});


export default mongoose.model('product', productSchema);
