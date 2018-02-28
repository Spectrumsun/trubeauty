import mongoose from 'mongoose';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

const Schema = mongoose.Schema;

const orderServiceSchema = new Schema({
   buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cart:{
    type: Object,
    required: true
  },
   address: {
    type: String,
    required: 'Address cannot be empty'
  },
  time: {
   type: String,
  },
  date: {
    type: String,
  },
  paymentId:{
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
