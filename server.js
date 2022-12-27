//Express app
const {app,http} = require("./app");

//ENV
require('dotenv').config();
const PORT = process.env.PORT || 8080;

//DB
//const { Contenedor } = require("./desafio2");

const server = http.listen(PORT, ()=>{
    console.log(`Server up and running on port: ${server.address().port}`)
})
