const form = document.getElementById('form');

form.addEventListener('submit',function(e){
    e.preventDefault();
    let check = document.querySelectorAll("#chat")
    check.forEach(element => {
        if (element.checked) {
            let sala = element.value;
            window.location.href = this.action + "/" + sala;
        }
    });
});