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

import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
const FileStore = sessionFileStore(session);
import MongoStore from 'connect-mongo';

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



app.use("/static",express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')))

app.set("views", "./views");
app.set("view engine", "ejs");

const productMock = new ProductMock();

app.get("/form", async (_req,res)=>{

    const mockData = await productMock.getProductsMock()
    res.render("pages/form",{mockData})
});

app.get("/", async (_req,res)=>{
    res.render("signin/signin")
});

//configuracion de session and cookies

const COOKIES_SECRET = process.env.COOKIES_SECRET || '';
app.use(cookieParser(COOKIES_SECRET));

if(process.env.SESSION_STORAGE == "MONGO_ATLAS"){
    console.info("MONGO ATLAS STORAGE");
    const mongoConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    const storeConfig = {
        mongoUrl: process.env.MONGO_ATLAS_URL,
        mongoOptions: mongoConfig
    }
    app.use(session({
        store:  MongoStore.create(storeConfig),
        secret: process.env.COOKIES_SECRET,
        resave: true,
        saveUninitialized: true
    }))
}

if(process.env.SESSION_STORAGE == "MONGO_DB"){
    console.info("MONGO DB STORAGE");
    const mongoConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    const storeConfig = {
        mongoUrl: process.env.MONGO_LOCAL_URL,
        mongoOptions: mongoConfig
    }
    app.use(session({
        store:  MongoStore.create(storeConfig),
        secret: process.env.COOKIES_SECRET,
        resave: true,
        saveUninitialized: true
    }))
}


if(process.env.SESSION_STORAGE == "FILE_STORE"){
    console.info("FILE-STORE STORAGE")
    const fileStoreConfig = {
        path: './session',
        ttl: 300,
        retries: 5
    }
    app.use(session({
        store: new FileStore(fileStoreConfig),
        secret: COOKIES_SECRET,
        resave: true,
        saveUninitialized: true
    }))
}

app.use(indexRouter);
app.use(errorMiddleware);

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