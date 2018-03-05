import mongoose from 'mongoose';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
  },
  time: {
   type: String,
  },
  date: {
    type: String,
  },
  ref:{
    type: String,
    required: true
  },
  created: {
    	type: Date,
    	default: Date.now
    },
});

orderSchema.plugin(mongodbErrorHandler);


export default mongoose.model('Order', orderSchema);
