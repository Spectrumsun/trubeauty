import multer from 'multer';
import cloudinary from 'cloudinary';

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



function upload(arg){
  const picture = cloudinary.v2.uploader.upload(arg)
    return picture
}

exports.upload;

