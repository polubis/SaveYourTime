const mongoose = require('mongoose');

const dictionariesSchema = mongoose.Schema({
  productId: { type: String, required: true, unique: true, ref: 'Product' },
  keywords: { type: [String] },
  versionKey: false
});

module.exports = mongoose.model('Dictionary', dictionariesSchema);
