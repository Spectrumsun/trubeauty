import User from '../models/User';
import mongoose from 'mongoose';

class Admin {
     static adminDashBoard (req, res) {
    res.render('adminhome', {title: 'Admin'});
  }
}

export default Admin;  