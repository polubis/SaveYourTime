const mongoose = require('mongoose');

const productCategorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  versionKey: false
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);
