import mongoose from 'mongoose';
import User  from '../models/User';
import Order from '../models/order';
import Product from '../models/Product';
import Cart from '../handlers/cart';
import mail3 from '../handlers/mail3';

require('dotenv').config({ path: '.env' });

const paystack = require('paystack')(process.env.SECRET_KEY);
class OrderServices {
  static async orderservice (req, res) {
      const products = await Product.findOne({ _id: req.params.id });
      res.render('orderservice', {title: 'Order Service', products });
  }

  static async viewProducts (req, res) {
      const products = await Product.find();
      res.render('viewproductclient',  {title: 'Products', products});
  }

  static async addToCart (req, res) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart: {});
    const product =  await Product.findById(productId);
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    req.flash('success', 'Added to Cart')
    res.redirect('/user/viewproduct');
  }

  static removeOneFromCart (req, res){
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart: {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    req.flash('success', 'Removed Succesfully');
    res.redirect('/user/mycart')
  }


  static async removeAll (req, res) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart: {});
    
    cart.removeAll(productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    req.flash('success', 'Removed Succesfully');
    res.redirect('/user/mycart')

  }

  static showCart(req, res) {
    const currentCart = req.session.cart;
    if(!currentCart){
      return res.render('mycart', {products: null});
    }
    const cart = new Cart(currentCart);

    res.render('mycart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
  }
  static checkout(req, res) {
    const currentCart = req.session.cart;
    if(!currentCart){
      return res.render('mycart', {products: null});
    }
    const cart = new Cart(currentCart);
    res.render('checkout',{ products: cart.generateArray(), totalPrice: cart.totalPrice, user: req.user });
  }

  static async Pay (req, res) {
     const order = new Order({
      buyerId: req.body.buyerId,
      cart: req.body.cart,
      address: req.body.address,
      time: req.body.date,
      date: req.body.time,
      ref: req.body.ref
    })
    await order.save();
    req.session.cart = null;

    /* return mail3.send({
      user,
      subject: 'order sent',
      order
    }, (data) => { 
      console.log(data)
      res.json({success: "success", order })
    })  */
    res.status(200).json({success: 'success', order});
  }
   
  static async orderList (req, res) {
    const order = await Order.find().populate('buyerId');
    res.status(200).json({success: 'success', order})
  }

  static getVerifyPayment (req, res) {
    res.render('verifypayment')
  }

  static async verifyPayment (req, res){
    const ref = req.body.ref;
    paystack.transaction.verify(ref, function(error, body) {
    console.log(error);
    console.log(body);
    res.status(200).json( {success: 'success',  body } );
    });
   
  }
  static getFindOrder (req, res) {
    res.render('viewoneorder');
  }

  static async findOrder (req, res) {
    const ref = req.body.ref;
    const findRef = await Order.findOne({'ref': ref}).populate('buyerId');
    const cart = new Cart(findRef);
    cart.add(product, product.id);
    console.log(cart);
    res.render('adminvieworder', {products: findRef});
  }
}



export default OrderServices;  







