const mongoose = require("mongoose");
require("dotenv").config();

const con = process.env.DB_CONNECTION;

mongoose.connect(con, { useNewUrlParser: true, useUnifiedTopology: true });
