addEventListener('DOMContentLoaded', alterarValores());


function alterarValores(id) {

    const nome = document.getElementById('inputNome').value;
    const email = document.getElementById('inputEmail').value;
    const nascimento = document.getElementById('inputNasc').value;
    const endereco = document.getElementById('inputEnd').value;
    const telefone = document.getElementById('inputTel').value;
    const cep = document.getElementById('inputCep').value;

    let obj = {
        id: id,
        nome: nome,
        email: email,
        nascimento: nascimento,
        endereco: endereco,
        telefone: telefone,
        cep: cep
    }

    fetch('/voluntarios/alterar', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(r=> {
        return r.json();
    }).then(r=> {
        if(r.ok) {
            window.location.href="/listagem";
        }   
        else {
            alert(r.msg);
        }
    })
}