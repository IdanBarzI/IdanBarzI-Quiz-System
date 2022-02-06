const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/user");

const app = express();

const con =
  "mongodb+srv://IdanBar:vkvkvkvkvk2@quizsystem.yzh1n.mongodb.net/quizsystem?retryWrites=true&w=majority";
mongoose
  .connect(con, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(5000, () => {
      console.log("app listen on port 5000");
    });
  });

app.get("/add-user", (req, res) => {
  const user = new User({
    firstName: "Haim",
  });

  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});
