require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then(() => console.log("MongoDB connected..."));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}...`);
});
