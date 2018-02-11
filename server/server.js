import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import cors from 'cors';
import path from 'path';
import routes from './routes/imdex';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, (err) => {
  if (err) {
    console.log('can not connect to the database');
  }
});

app.use('/api/v1/', routes);
app.use(morgan('dev'));
app.use(cors());
app.use(expressValidator());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, '/../client/public')));
// app.use(express.static(path.join(__dirname, '/../client/src')));

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '/../client/public/index.html'));
  res.status(404).send({ message: 'That url does not exist on this server 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫' });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


export default app;
