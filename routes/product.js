const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product');

router.post('/', upload.single('image'), createProduct);
router.get('/', getProducts);
router.get('/:id', getSingleProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;