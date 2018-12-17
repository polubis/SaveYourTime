const mongoose = require('mongoose');
const shoppingSchema = mongoose.Schema({
  name: { type: String, unique: true },
  products: { type: [ { _id: String, cost: Number, discount: Number, quantity: Number, sum: Number } ], required: true },
  date: { type: Date },
  shopsIds: { type: [String] },
  wholeCost: { type: Number, required: true },
  payWay: { type: String, required: true },
  versionKey: false
});

module.exports = mongoose.model('Shopping', shoppingSchema);
