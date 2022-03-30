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
        
        // aqui tomo el envento de cuando un usuario se conecta 
        socket.on('usuario:conectado',(usuario)=> {
            if (!usuariosConectados[usuario.sala].includes(usuario.usuario)) {
                usuariosConectados[usuario.sala].push(usuario.usuario);
            }
            
            io.emit('usuarios',usuariosConectados);
        });
        
        // aqui cuando hay un mensaje de chat 1 
        socket.on('chat1', (msg) => {
            io.emit('chat1',msg)
        });

          // aqui cuando hay un mensaje de chat 2
        socket.on('chat2', (msg) => {
            io.emit('chat2',msg)
        })

          // aqui cuando hay un mensaje de chat 3
        socket.on('chat3', (msg) => {
            io.emit('chat3',msg)
        })

          // aqui cuando hay un mensaje de chat 4
        socket.on('chat4', (msg) => {
            io.emit('chat4',msg)
        })

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



