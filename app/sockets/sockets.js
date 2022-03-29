// usando la libreria socket.io 
let usuariosConectados = {
    chat1 :[],
    chat2: [],
    chat3: [],
    chat4: []
}

module.exports = io => {

    io.on('connection', (socket) => {
        
        socket.on('usuario:conectado',(usuario)=> {
            if (!usuariosConectados[usuario.sala].includes(usuario.usuario)) {
                usuariosConectados[usuario.sala].push(usuario.usuario);
            }
            
            io.emit('usuarios',usuariosConectados);
        });
        
        socket.on('chat1', (msg) => {
            io.emit('chat1',msg)
        });

        socket.on('chat2', (msg) => {
            io.emit('chat2',msg)
        })

        socket.on('chat3', (msg) => {
            io.emit('chat3',msg)
        })

        socket.on('chat4', (msg) => {
            io.emit('chat4',msg)
        })
    })
}



