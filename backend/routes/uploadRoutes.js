import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const maxSize = 1 * 1024 * 1024;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Pass NULL for the error
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  // Test if the format from the image match with the 3 types below
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// CHANGE FOR MULTIPLEIMAGES
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
