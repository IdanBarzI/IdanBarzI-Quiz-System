require("dotenv").config();
require("./DB/mongoose");
const { setup } = require("./utils/di-setup");
setup();
const express = require("express");
const userRouter = require("./routers/user");
const questionRouter = require("./routers/question");
const fieldService = require("./routers/field");
const cors = require("cors");
const corsOptions = require("./options/corsOptions");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(userRouter);
app.use(questionRouter);
app.use(fieldService);

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
