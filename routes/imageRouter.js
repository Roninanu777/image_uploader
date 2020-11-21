const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ImageModel = require("../models/Image");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./routes/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/single", upload.single("image"), (req, res) => {
  let obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };

  try {
    ImageModel.create(obj)
      .then((doc) => res.send(doc))
      .catch((err) => res.send(err));
  } catch (err) {
    res.send(400);
  }
});

module.exports = router;
