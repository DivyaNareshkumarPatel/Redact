const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  modifiedDate: { type: Date, required: true },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model('File', fileSchema);
