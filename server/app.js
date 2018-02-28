import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import flash from 'connect-flash';
import passport from 'passport';
import mongoose, { Mongoose } from 'mongoose';
import cookieParser from 'cookie-parser'; 
import expressValidator from 'express-validator';
import cors from 'cors';
import path from 'path';
import routes from './routes/index';
import errorHandlers from './handlers/errorHandlers';
import Security from './middleware/security';

const MongoStore = require('connect-mongo')(session);
require('./handlers/passport');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());


app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {maxAge: 100 * 60 * 1000}
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  res.locals.session = req.session;
  next();
});

app.use((req, res, next) => {
  req.login = (req.login, req);
  next();
});


app.use('/', routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);


if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.developmentErrors);
app.use(errorHandlers.productionErrors);


export default app;
