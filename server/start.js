import "babel-polyfill";
import mongoose from 'mongoose';
import path from 'path';
import app from './app';

require('dotenv').config({ path: '.env' });

require('./models/User');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; 

mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});


app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

