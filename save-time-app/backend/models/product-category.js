const mongoose = require('mongoose');

const productCategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  versionKey: false
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);
