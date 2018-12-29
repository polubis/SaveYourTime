const mongoose = require('mongoose');

const userSettingsSchema = mongoose.Schema({
  salary: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  versionKey: false
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);
