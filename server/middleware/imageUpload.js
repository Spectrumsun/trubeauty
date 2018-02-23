import multer from 'multer';
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

