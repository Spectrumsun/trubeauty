import mongoose from 'mongoose';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

const Schema = mongoose.Schema;

const orderServiceSchema = new Schema({
  productId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Product'
  },
  productname:{
    type: String,
  },
  location: {
    type: String,
    required: 'add the location you need the service',
    trim: true
  },
 buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  buyeremail: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  created: {
    	type: Date,
    	default: Date.now
    },
});

orderServiceSchema.plugin(mongodbErrorHandler);


export default mongoose.model('OrderService', orderServiceSchema);
