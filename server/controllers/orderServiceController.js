import mongoose from 'mongoose';
import User  from '../models/User';
import OrderService from '../models/orderService';


class OrderServices {
     static orderserviceForm (req, res) {
    res.render('orderservice', {title: 'Order Service'});
  }
}

export default OrderServices;  