const socket = io();

//----------------codigo sobre producto ------------

let onlineProducts = [];

function updateProducts(data){
    let productsToHtml = "";
    if (data.length > 0){
        data.forEach( i => {
            productsToHtml = productsToHtml + 
                `<tr> <th scope="row"> ${i.title}</th>` + 
                `<td> ${i.price}</td>` + 
                `<td><img src=${i.thumbnail} width="40px" height="40px"></img></td></tr>`
        })
    } else {
    productsToHtml = `<p>No hay productos en el carrito</p>`;
    }
    document.querySelector("#productsList").innerHTML = productsToHtml;
}

function sendNewProduct(){
    const title = document.querySelector("#title").value;
    const price = document.querySelector("#price").value;
    const thumbnail = document.querySelector("#thumbnail").value;
    const productObject = {
        title,
        price,
        thumbnail
    }
    socket.emit("NEW_PRODUCT_TO_SERVER", productObject);
    document.querySelector("#title").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#thumbnail").value = "";
}



socket.on("UPDATE_PRODUCTS", data =>{
    onlineProducts = data;
    updateProducts(data);
})

socket.on("NEW_PRODUCT_FROM_SERVER", data =>{
    onlineProducts.push(data);
    updateProducts(onlineProducts);
})

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