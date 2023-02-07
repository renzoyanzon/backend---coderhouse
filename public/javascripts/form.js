const socket = io();


//------------codigo sobre el mensaje ---------------

let messages = [];

function sendNewMessage(){
    const message = document.querySelector("#message").value;
    const messageObject = {
        message
    }
    socket.emit("NEW_MESSAGE_TO_SERVER", messageObject);
    document.querySelector("#message").value = "";
}

function updateMessages(data){
    let messagesToHtml = "";
    data.forEach( i => {
        messagesToHtml = messagesToHtml + `<li> ${i.message}</li>`
    })
    document.querySelector("#messageList").innerHTML = messagesToHtml;
}

socket.on("UPDATE_DATA", data => {
    messages = data;
    updateMessages(data)
});

socket.on("NEW_MESSAGE_FROM_SERVER", data => {
    messages.push(data);
    updateMessages(messages);
})