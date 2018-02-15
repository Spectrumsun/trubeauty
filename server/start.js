import mongoose from 'mongoose';
import path from 'path';
import app from './app';
import User from './models/User';

require('dotenv').config({ path: 'variables.env' });
// import environmental variables from our variables.env file


// Connect to our Database and handle an bad connections

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});






// Start our app!

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
