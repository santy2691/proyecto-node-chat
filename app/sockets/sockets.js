// usando la libreria socket.io 

// aqui almaceno los usuarios conectados 
let usuariosConectados = {
    chat1 :[],
    chat2: [],
    chat3: [],
    chat4: []
}

module.exports = io => {
    // tomo el envento de conexion 
    io.on('connection', (socket) => {
        // entrada a la sala por parte del cliente 
        socket.join(socket.request.headers.sala);
        
        socket.on('mensaje_enviado', (msg) =>{
            io.in(socket.request.headers.sala).emit('mensaje_enviado',msg);
        })
        
        // aqui tomo el envento de cuando un usuario se conecta 
        socket.on('usuario:conectado',(usuario)=> {
            if (!usuariosConectados[usuario.sala].includes(usuario.usuario)) {
                usuariosConectados[usuario.sala].push(usuario.usuario);
            }
            
            io.emit('usuarios',usuariosConectados);
        });
        

        // aqui tomo el evento de desconeccion de un usuario y actualizo 
        // la lista de usuarios conectados 
        socket.conn.on("close", (reason)=> {
            let usuario = socket.request.headers.user;
            let sala = socket.request.headers.sala;
            if (usuariosConectados[sala].includes(usuario)) {
                let index = usuariosConectados[sala].indexOf(usuario);
                usuariosConectados[sala].splice(index,1);
                io.emit('usuarios',usuariosConectados);
            }
        })
    })
}




