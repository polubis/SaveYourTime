const mongoose = require('mongoose');

const userSettingsSchema = mongoose.Schema({
  salary: { type: Number },
  currency: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  versionKey: false
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);
