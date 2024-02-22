
const multer = require("multer");
const path = require("path");

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp','image/jpg'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/productImages'); // Destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename for each uploaded image
  }
});

const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error(' Only JPG and PNG images are allowed.'), false);
  }
};
const upload = multer({ storage, fileFilter });

// BANNER
const banner = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/banner'); // Destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename for each uploaded image
  }
});

// const update = multer({ banner,fileFilter});

// module.exports={update}

module.exports={upload}