const express = require("express");
const indexRouter = require("./src/routes/index");
const errorMiddleware = require("./src/middlewares/errorMiddleware")
const _=require("lodash");
require("dotenv").config();
const logger = require('morgan');
const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));


app.use("/api", indexRouter);

app.use("/static",express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')))

//desafio EJS
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (_req,res)=>{
    res.render("pages/form",{products})
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

//Configuracion de sockets

const http= new HttpServer(app);
const io = new IoServer(http);

const products =[{title:"ejemplo1",price: 20, thumbnail: "https://cdn1.iconfinder.com/data/icons/city-flat-2/512/people_person_man_stand_men-512.png"}];
const messages= [{message: "Hello"}];


// Conección a socket

io.on("connection",(socket)=>{
    console.info("Nuevo cliente conectado");

    socket.emit("UPDATE_PRODUCTS", products);
    socket.on("NEW_PRODUCT_TO_SERVER", data => {
        products.push(data);
        console.info(products);
        io.sockets.emit("NEW_PRODUCTS_FROM_SERVER", data);
    })

    socket.emit("UPDATE_DATA", messages);
    socket.on("NEW_MESSAGE_TO_SERVER", data => {
        messages.push(data);
        console.info(messages);
        io.sockets.emit("NEW_MESSAGE_FROM_SERVER", data);
    })
})




module.exports = {app,http,io};