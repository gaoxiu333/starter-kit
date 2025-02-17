import express from "express";
import path from 'path'
import {errorHandler} from './error.js'

import exampleRouter from './routes/index.js'

const app = express();
const port = 3030;
const rootDir = path.resolve();
const publicDir = path.join(rootDir, "public");

app.use(errorHandler)
app.use("/", express.static(publicDir));
app.use(exampleRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log("listen to port:", port);
});
