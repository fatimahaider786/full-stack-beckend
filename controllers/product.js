const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = req.file.path; // Ye Cloudinary ka direct secure URL hoga
    } else if (req.body.image) {
      imagePath = req.body.image;
    }

    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      rating: req.body.rating,
      review: req.body.review,
      image: imagePath, // Ye MongoDB Atlas mein save ho jayega
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating product", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    let updateData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      rating: req.body.rating,
      review: req.body.review,
    };

    if (req.file) {
      updateData.image = req.file.path; // Cloudinary secure URL for update
    } else if (req.body.image) {
      updateData.image = req.body.image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating product", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting product", error: error.message });
  }
};

module.exports = { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct };