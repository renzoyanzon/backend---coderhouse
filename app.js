import express from 'express'; 
import indexRouter from "./src/routes/index.js";
import errorMiddleware from"./src/middlewares/errorMiddleware.js";
//const _=require("lodash");
import dotenv from 'dotenv'
dotenv.config(); //Declaración para uso de .env
import {Server as HttpServer} from 'http';
import {Server as IoServer} from 'socket.io';
import ProductMock from './src/services/mock/mock.services.js';
import fs from 'fs';
import normalizeChat from './src/services/utils/normChat.js';

import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//creacion de app
const app = express();
const http = new HttpServer(app);
const io = new IoServer(http);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", indexRouter);
app.use(errorMiddleware);

app.use("/static",express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')))

app.set("views", "./views");
app.set("view engine", "ejs");

const productMock = new ProductMock();

app.get("/", async (_req,res)=>{

    const mockData = await productMock.getProductsMock()
    res.render("pages/form",{mockData})
});

// Utilizacion de socket para la comunicacion bidireccional del chat
// Coneccion de socket
const chat =[];
let mens;

io.on("connection",(socket)=>{
    console.info("Nuevo cliente conectado");

    socket.on("NEW_MESSAGE_TO_SERVER", data=>{
        chat.push(data);
        console.log(data)
        mens = data;
        const chatJSON = JSON.stringify(chat);
        try {
            fs.promises.writeFile('./chat.txt',chatJSON)
        } catch (err) {
            console.log("No se guardo el chat",err)
        }
        emitirChat()
    })
    socket.emit("UPDATE_DATA", chat);
})

    const emitirChat=()=>{
        io.sockets.emit("NEW_MESSAGE_FROM_SERVER",chat);
        io.sockets.emit('chatNorm',chatNorm) 
        io.sockets.emit('compresion',compresionMensajes(mensajes,chatNorm))
    }

// Normalizando el chat

let mensajes = {
    id:"mensajes",
    mensajes: chat
};

let chatNorm=normalizeChat(mensajes);

const compresionMensajes =(mensajes,chatNorm)=>{
    let m = JSON.stringify(mensajes).length
    let n = JSON.stringify(chatNorm).length
    let compresion = 100*((n)/(m));
    return compresion
} 

export  {app,io,http};