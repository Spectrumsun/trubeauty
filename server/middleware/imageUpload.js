import multer from 'multer';
import cloudinary from 'cloudinary';
import Product from '../models/Product';

require('dotenv').config({ path: '.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret:  process.env.API_SECRET 
});

const multerOptions = {
    storage: multer.diskStorage({
    filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
        }
    }),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That filetype isn\'t allowed!' }, false);
        }
    }
}


exports.upload = multer(multerOptions).single('picture');


exports.check = async (req, res, next) => {
	if(!req.file){
        const product = await Product.findOne({ _id: req.params.id});
        req.photos = product.picture
        console.log('2nd ' + req.photos);
		next();
        return
	} 
    const pic = await cloudinary.v2.uploader.upload(req.file.path)
    req.photos = pic.secure_url
    next();
}


/* exports.editUpLoad = (arg) => {
    const picture = cloudinary.v2.uploader.explicit(arg)
    return picture
}

exports.deleteUpLoad = (arg) => {
    const picture = cloudinary.v2.uploader.destroy(arg)
    return picture
}  */

