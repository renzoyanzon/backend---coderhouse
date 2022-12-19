const express = require("express");
const indexRouter = require("./src/routes/index");
const errorMiddleware = require("./src/middlewares/errorMiddleware")
const _=require("lodash");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const products= [];

app.use("/api", indexRouter);

app.use("/static",express.static(__dirname + "/public"));

//desafio EJS
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (_req,res)=>{
    res.render("pages/form")
});

app.get("/productos", (_req,res)=>{
    res.render("pages/view", {products})
})

app.post("/productos", (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (_.isNil(title) || _.isNil(price) || _.isNil(thumbnail)){
        res.render("error", {message: "Hay un problema con las variables"})
    } else {
        products.push({title, price, thumbnail });
       res.render("pages/form", {products});
    }
})


module.exports = app;