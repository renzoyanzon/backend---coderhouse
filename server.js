//Express app
import app from "./app.js";

//ENV

const PORT = process.env.PORT || 8080;


const server = app.listen(PORT, ()=>{
    console.log(`Server up and running on port: ${server.address().port}`)
})
