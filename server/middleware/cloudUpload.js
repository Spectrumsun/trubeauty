import cloudinary from 'cloudinary';

require('dotenv').config({ path: '.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret:  process.env.API_SECRET 
});


function upload(arg){
  const picture = cloudinary.v2.uploader.upload(arg)
    return picture
}


export default upload;

