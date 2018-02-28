import mongoose from 'mongoose';
import User  from '../models/User';
import Order from '../models/orderService';
import Product from '../models/Product';
import Cart from '../handlers/cart';
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

  static showCart(req, res) {
    const currentCart = req.session.cart;
    if(!currentCart){
      return res.render('mycart', {products: null});
    }
    const cart = new Cart(currentCart);
    res.render('mycart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
  }

  static async pay (req, res) {
    res.json('pay me')
  }

  static async PayforOrder (req, res) {
    const products = await Product.findOne({ _id: req.body.id });
    if(!products){
      req.flash('error', 'No product with such id')
      res.redirect('/viewproduct', req.flash());
    }

    const order = new Order({
      location: req.body.location,
      address: req.body.address,
      time: req.body.time,
      date: req.body.date,
      productId: products._id,
      productname: products.productname,
      buyerId: req.user._id,
      buyeremail: req.user.email
    })

    await order.save();
    res.render('paystack', {title: 'Paystack', order})
  }
}


export default OrderServices;  