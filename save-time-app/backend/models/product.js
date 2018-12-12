const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  type: { type: String, required: true },
  picturePath: { type: String },
  rate: { type: Number },
  calories: { type: Number },
  numberOfVotes: { type: Number }
});

module.exports = mongoose.model('Product', productSchema);
