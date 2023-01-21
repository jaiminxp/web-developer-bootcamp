const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be empty'],
  },
  price: {
    type: Number,
    required: true,
    min: true,
  },
  category: {
    type: String,
    enum: ['fruit', 'vegetable', 'dairy'],
    lowercase: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
