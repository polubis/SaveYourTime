const mongoose = require('mongoose');
const shoppingSchema = mongoose.Schema({
  name: { type: String, unique: true },
  productsIds: { type: [String], required: true },
  date: { type: Date },
  shopsIds: { type: [String] },
  sum: { type: Number },
  payWay: { type: String, required: true },
  versionKey: false
});

module.exports = mongoose.model('Shopping', shoppingSchema);
