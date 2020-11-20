const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ImageModel = require("../models/Image");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), (req, res, next) => {
  const obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads", req.file.filename)
      ),
      contentType: "image/png",
    },
  };

  ImageModel.create(obj, (err, item) => {
    if (err) console.log(err);
    else {
      res.redirect("/");
    }
  });
});

router.get("/", (req, res) => {
  ImageModel.find({}, (err, items) => {
    if (err) console.log(err);
    else {
      res.status(200).json({ items: items });
    }
  });
});
