import mongoose from 'mongoose';
import Product  from '../models/Product';
import upload from '../middleware/imageUpload';

require('dotenv').config({ path: '.env' });
class Products {
  static ProudctForm (req, res) {
    res.render('productform', {title: 'Product Form'});
  }
 
  static async Addproduct (req, res) {
    const pic = await upload(req.file.path)
    console.log(pic)
    const product = new Product({
            category: req.body.category,
            productname: req.body.productname,
            price: req.body.price,
            picture: pic.secure_url,
            sender: req.user._id
    })

    await product.save();
    req.flash('success', 'Product Added!!');
    res.redirect('/admin/viewproduct')
  }

static async LoadEditProducts (req, res) {
    const product = await Product.findOne({ _id: req.params.id});
    res.render('editProductForm', {title: `Edit ${product.category}`, product})
}

static async EditProducts (req, res) {
    const products = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec()
    req.flash('success', 'Product Successfully Updateded!!')
    res.redirect('/admin/viewproduct')
}

static async GetProducts (req, res) {
    const products = await Product.find();
    res.render('admingetproduct', {title: 'Product List', products})
}


static async DeleteProduct (req, res) {
    const product = await Product.remove(({_id: req.params.id}))
    req.flash('success', 'Product Removed!!');
    res.redirect('/admin/viewproduct');
}


}

export default Products;
