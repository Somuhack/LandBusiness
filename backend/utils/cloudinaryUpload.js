const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadToCloudinaryAndRemoveLocal = async (localPath) => {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: 'land_documents'
    });
    fs.unlinkSync(localPath); // delete local file after upload
    return result.secure_url;
  } catch (err) {
    fs.unlinkSync(localPath); // still delete local file if upload fails
    throw err;
  }
};

module.exports = uploadToCloudinaryAndRemoveLocal;
