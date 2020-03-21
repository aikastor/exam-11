const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');

const Product = require('../models/Product');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Product.find().populate('category');
  res.send(items);
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);

    if (!item) {
      return res.status(404).send({message: 'Not found'});
    }

    res.send(item);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});
router.get('/categories/:id',  async (req, res) => {
  try {
    const items = await Product.find({category: req.params.id});

    if (!items) {
      return res.status(404).send({message: 'Not found'});
    }

    res.send(items);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});
router.post('/', upload.single('image'), async (req, res) => {
  const productData = req.body;

  if (req.file) {
    productData.image = req.file.filename;
  }

  const product = new Product(productData);

  try {
    await product.save();

    return res.send({id: product._id});
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;