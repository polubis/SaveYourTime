const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true, ref: 'ProductCategory' },
  picturePath: { type: String },
  rate: { type: Number },
  calories: { type: Number },
  caloriesUnit: { type: String },
  versionKey: false
});

module.exports = mongoose.model('Product', productSchema);
