const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    name: String,
    desc: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Image", imageSchema);
