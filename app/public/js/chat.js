const botonEnviar = document.getElementById('botonChat');
const cuadroMensajes = document.getElementById('chatText');
const usuriosConectados = document.getElementById('usuariosConectados');
const sala = document.getElementById('sala').value;
const usuario = document.getElementById('usuario').value;

// iniciar conexion con el servidor 
// le mando la info del usuario y de la sala para la desconexion 
let socket = io({
    extraHeaders: {
        "user": usuario,
        "sala": sala
    }
});

// cuando se conecta el usuario en esta sala envio la info para agregar en la
// tabla de usuarios conectados 
socket.on('connect', () => {
    socket.emit('usuario:conectado',{usuario: usuario, sala: sala});
})


// cuando se conecta un usuario el servidor envia la info y actualizo la
// tabla de usuarios conectados 
socket.on('usuarios', (usuarios)=> {
    let usariosSala = usuarios[sala];
    agregarUsariosConectados(usuriosConectados,usariosSala,usuario);

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
        socket.emit('mensaje_enviado', data.mensaje);
    }
});


// recibir el emensaje desde socket.io
socket.on('mensaje_enviado', function(msg){
    agregarMensaje(cuadroMensajes,msg);
})

// funcion para agregar al chat el nuevo mensaje 
function agregarMensaje(elementoDOM, msj,user) {
    let mensaje = msj.mensaje;
    let author = msj.author;
    console.log(msj.create_at);
    let fecha = new Date(msj.create_at).toLocaleDateString();
    let hora = new Date(msj.create_at).toLocaleTimeString();
    let string = author + " [ " + fecha + " " + hora + " ] " + mensaje; 
    let div = document.createElement('div');
    let parrafo = document.createElement('p');
    parrafo.className += "mensaje";
    parrafo.textContent = string;
    div.className += author === user ? "textUser" : "textOtro";
    div.appendChild(parrafo);
    elementoDOM.appendChild(div);
}

// funcion para actualizar tabla de usuarios 
function agregarUsariosConectados(elementoDOM, usuarios) {
    let usuariosHTML = "";
    usuarios.forEach(element => {
        usuariosHTML += "<p>" + element + "</p>";
    });
    elementoDOM.innerHTML = usuariosHTML;
}