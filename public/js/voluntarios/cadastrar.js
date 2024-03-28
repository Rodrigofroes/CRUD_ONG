document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("voluntarioNome").style["border-color"] = "#ced4da";
        document.getElementById("voluntarioEmail").style["border-color"] = "#ced4da";
        document.getElementById("voluntarioTelefone").style["border-color"] = "#ced4da";
        document.getElementById("voluntarioDataNasc").style["border-color"] = "#ced4da";
        document.getElementById("voluntarioEndereco").style["border-color"] = "#ced4da";
        document.getElementById("voluntarioCEP").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let nome = document.querySelector("#voluntarioNome").value;
        let email = document.querySelector("#voluntarioEmail").value;
        let telefone = document.querySelector("#voluntarioTelefone").value;
        let dataNasc = document.querySelector("#voluntarioDataNasc").value;
        let endereco = document.querySelector("#voluntarioEndereco").value;
        let cep = document.querySelector("#voluntarioCEP").value;


        let listaErros = [];
        if(nome == "") {
            listaErros.push("voluntarioNome");
        }
        if(email == "") {
            listaErros.push("voluntarioEmail");
        }
        if(telefone == "") {
            listaErros.push("voluntarioTelefone");
        }
        if(dataNasc == 0) {
            listaErros.push("voluntarioDataNasc");
        }
        if(endereco == "") {
            listaErros.push("voluntarioEndereco");
        }
        if(cep == 0) {
            listaErros.push("voluntarioCEP");
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                nome: nome,
                email: email,
                telefone: telefone,
                dataNasc: dataNasc,
                endereco: endereco,
                cep: cep,
            }

            fetch("/voluntarios/cadastrar", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r.ok) {
                    window.location.href="/voluntarios";
                }   
                else {
                    alert(r.msg);
                }
            })
        }
        else{
            //avisar sobre o preenchimento incorreto
            for(let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }

})