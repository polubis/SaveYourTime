const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  picturePath: { type: String },
  rate: { type: Number },
  calories: { type: Number },
  caloriesUnit: { type: String },
  userId: { type: String, required: true },
  versionKey: false
});

module.exports = mongoose.model('Product', productSchema);
