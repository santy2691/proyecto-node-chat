const form = document.getElementById('form');
const inputSala = document.getElementById('sala');

form.addEventListener('submit',function(e){
    let inputSelecionado = false;
    let check = document.querySelectorAll("#chat"); 
    check.forEach(element => {
        if (element.checked) {
            let sala = element.value;
            inputSala.value = sala;
            this.action += "/" + sala;
            inputSelecionado = true;
        }
    });

    if (!inputSelecionado) e.preventDefault()
});