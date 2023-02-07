import express from 'express'; 
import indexRouter from "./src/routes/index.js";
import errorMiddleware from"./src/middlewares/errorMiddleware.js";
//const _=require("lodash");
import dotenv from 'dotenv'
dotenv.config(); //Declaración para uso de .env


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", indexRouter);
app.use(errorMiddleware);

app.set("views", "./views");
app.set("view engine", "ejs");





export default app;