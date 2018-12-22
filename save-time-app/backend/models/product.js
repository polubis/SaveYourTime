const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  company: { type: String },
  type: { type: String },
  picturePath: { type: String },
  rate: { type: Number },
  calories: { type: Number },
  price: { type: Number },
  versionKey: false
});

module.exports = mongoose.model('Product', productSchema);
