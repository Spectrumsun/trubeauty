import mongoose from 'mongoose';
import User  from '../models/User';
import OrderService from '../models/orderService';


class OrderServices {
     static orderservice (req, res) {
    res.render('orderservice', {title: 'Order Service'});
  }

  static async viewProducts (req, res) {
    const products = await Product.find();
    res.render('viewproductclient', {title: 'Products'});
  }
}

export default OrderServices;  