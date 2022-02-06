require("dotenv").config();
require("./DB/mongoose");
const express = require("express");
const userRouter = require("./routers/user");
const cors = require("cors");
const corsOptions = require("./options/corsOptions");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(userRouter);

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
