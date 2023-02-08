const socket = io();


//------------codigo sobre el mensaje ---------------

let messages = [];

function sendNewMessage(){

    const message= {
        author: {
            id: document.querySelector("#email").value,
            nombre: document.querySelector("#name").value,
            apellido: document.querySelector("#lastname").value,
            edad: document.querySelector("#age").value,
            date: new Date().toLocaleString()
        },
        text: document.querySelector("#message").value
    }
    
    socket.emit("NEW_MESSAGE_TO_SERVER", message);
    document.querySelector("#message").value = "";
}

socket.on("UPDATE_DATA", data => {
    const text = data.map(i=>
        `<div>
        <strong style="color: blue;">${i.author.id} <span style="color: brown;">${i.author.date}<span></strong>
        <em style="color: green;">${i.text}</em>
        </div>`).join('')
    
    document.querySelector("#messageList").innerHTML =  text
});

socket.on("NEW_MESSAGE_FROM_SERVER", data => {
    const text = data.map(i=>
        `<div>
        <strong style="color: blue;">${i.author.id} <span style="color: brown;">${i.author.date}<span></strong>
        <em style="color: green;">${i.text}</em>
        </div>`).join('')
    
    document.querySelector("#messageList").innerHTML =  text
        
})

socket.on('compresion',compresion =>{
    document.getElementById('compresion').innerHTML = `La compresion es de ${compresion}%`
})