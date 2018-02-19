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
  location: {
    type: String,
    required: 'Location Required ',
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

addServiceSchema.plugin(mongodbErrorHandler);


export default mongoose.model('AddService', addServiceSchema);
