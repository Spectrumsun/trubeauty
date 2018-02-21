import mongoose from 'mongoose';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

const Schema = mongoose.Schema;

const addServiceSchema = new Schema({
  servicetype: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Service Required'
  },
  address: {
    type: String,
    required: 'address Required ',
    trim: true
  },
  time: {
    type: String,
    required: 'Time Required',
    trim: true
  },
  senderName: {
    type: String,
    required: true
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

addServiceSchema.plugin(mongodbErrorHandler);


export default mongoose.model('AddService', addServiceSchema);
