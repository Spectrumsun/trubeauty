import mongoose from 'mongoose';
import User  from '../models/User';
import AddService from '../models/AddSevice';

class AddServices {
  static addServiceFrom (req, res) {
    res.render('addservice', {title: 'Add Service'});
  }

  static async addservice (req, res) {
    const service = new AddService ({
            servicetype: req.body.servicetype,
            address: req.body.address, 
            time: req.body.time,
            senderName: req.user.username,
            sender: req.user._id
    } );
    await service.save();
    req.flash("success", `We well Get back to you`);
    res.redirect("/")
  }
  
}

export default AddServices;  