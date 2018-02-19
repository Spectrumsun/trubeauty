import mongoose from 'mongoose';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

const Schema = mongoose.Schema;

const orderServiceSchema = new Schema({
  seriveType: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Add the serive you want to need'
  },
  location: {
    type: String,
    required: 'add the location you need the service',
    trim: true
  },
 sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  created: {
    	type: Date,
    	default: Date.now
    },
});

orderServiceSchema.plugin(mongodbErrorHandler);


export default mongoose.model('OrderService', orderServiceSchema);
