const express = require("express");
const indexRouter = require("./src/routes/index");
const errorMiddleware = require("./src/middlewares/errorMiddleware")
const _=require("lodash");
require("dotenv").config();




const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use("/api", indexRouter);
app.use(errorMiddleware)  

module.exports = app;