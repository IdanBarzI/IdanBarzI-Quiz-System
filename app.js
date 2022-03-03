require("dotenv").config();
require("./DB/mongoose");
const { setup } = require("./utils/di-setup");
setup();
const express = require("express");
const userRouter = require("./routers/user");
const questionRouter = require("./routers/question");
const fieldRouter = require("./routers/field");
const organRouter = require('./routers/organization');
const studentTestsRouter = require('./routers/studentTest')
const testRouter = require('./routers/test')
const answerRouter = require('./routers/answerRouter')
const tagsRouter = require('./routers/tags')
const reportRouter = require('./routers/reportRouter')
const cors = require("cors");
const corsOptions = require("./options/corsOptions");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors(corsOptions));


app.use(userRouter);
app.use(questionRouter);
app.use(fieldRouter);
app.use(organRouter);
app.use(studentTestsRouter);
app.use(testRouter)
app.use(answerRouter)
app.use(tagsRouter)
app.use(reportRouter)

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
