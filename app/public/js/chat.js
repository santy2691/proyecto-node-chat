const botonEnviar = document.getElementById('botonChat');
const cuadroMensajes = document.getElementById('chatText');
const sala = document.getElementById('sala').value;
const usuario = document.getElementById('usuario').value;

let socket = io();

socket.on('connect', () => {
    socket.emit('usuario:conectado',{usuario: usuario, sala: sala});
})

socket.on('usuarios', (usuarios)=> {
    console.log(usuarios);
})

// evento del click 
botonEnviar.addEventListener('click',async ()=>{
    let mensaje = document.getElementById('mensaje').value;
    const respuesta = await fetch('http://localhost:3000/chat/send',{
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({mensaje,sala})
    })
    const data = await respuesta.json();
    if (data.success) {
        socket.emit(sala, data.mensaje);
    }
});


// recibir el emensaje desde socket.io
socket.on(sala, function(msg){
    agregarMensaje(cuadroMensajes,msg);
})

// funcion para agregar al chat el nuevo mensaje 
function agregarMensaje(elementoDOM, msj) {
    let mensaje = msj.mensaje;
    let author = msj.author;
    console.log(msj.create_at);
    let fecha = new Date(msj.create_at).toLocaleDateString();
    let hora = new Date(msj.create_at).toLocaleTimeString();
    let string = author + " [ " + fecha + " " + hora + " ] " + mensaje; 
    let div = document.createElement('div');
    let parafo = document.createElement('p');
    parafo.textContent = string;
    div.className += "textUser";
    div.appendChild(parafo);
    elementoDOM.appendChild(div);
}