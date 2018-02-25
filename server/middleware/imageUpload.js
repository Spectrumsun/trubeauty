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


exports.newUpload = async (req, res, next) => {
	if(!req.file){
        req.photos = {
            secure_url: process.env.SECURE_URL,
            public_id: process.env.PUBLIC_ID
        }
		next();
        return
	} 
    const pic = await cloudinary.v2.uploader.upload(req.file.path)
    req.photos = pic;
    console.log(req.photos)
    next();
}



exports.editUpLoad = async (req, res, next) => {
    const product = await Product.findOne({ _id: req.params.id});
    if(!req.file){
        req.photos = {
            secure_url: product.picture,
            public_id: product.pictureId
        }
        req.photos.secure_url = product.picture;
        req.photos.public_id = product.pictureID
		next();
        return
	}
    
    const remove = await cloudinary.v2.uploader.destroy(product.pictureID);
    const pic = await cloudinary.v2.uploader.upload(req.file.path);
    req.photos = pic;
    console.log(req.photos);
    next();
} 



exports.deleteUpLoad = async (req, res, next) => {
    const product = await Product.findOne({ _id: req.params.id});
    const picture = await cloudinary.v2.uploader.destroy(product.pictureID)
    console.log(picture)
    next();
}


