import passport from 'passport';
import mongoose from 'mongoose';
import User from '../models/User';

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
