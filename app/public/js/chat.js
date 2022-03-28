const botonEnviar = document.getElementById('botonChat');


botonEnviar.addEventListener('click',async ()=>{
    let mensaje = document.getElementById('mensaje').value;
    const respuesta = await fetch('http://localhost:3000/chat/send',{
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({mensaje})
    })
    const data = await respuesta.json();
    console.log(data);

})