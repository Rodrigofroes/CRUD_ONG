document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("empresaNome").style["border-color"] = "#ced4da";
        document.getElementById("empresaCNPJ").style["border-color"] = "#ced4da";
        document.getElementById("empresaTelefone").style["border-color"] = "#ced4da";
        document.getElementById("empresaEmail").style["border-color"] = "#ced4da";
        document.getElementById("empresaEndereco").style["border-color"] = "#ced4da";
        document.getElementById("empresaCidade").style["border-color"] = "#ced4da";
        document.getElementById("empresaEstado").style["border-color"] = "#ced4da";
        document.getElementById("empresaCEP").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let nome = document.querySelector("#empresaNome").value;
        let cnpj = document.querySelector("#empresaCNPJ").value;
        let telefone = document.querySelector("#empresaTelefone").value;
        let email = document.querySelector("#empresaEmail").value;
        let endereco = document.querySelector("#empresaEndereco").value;
        let cidade = document.querySelector("#empresaCidade").value;
        let estado = document.querySelector("#empresaEstado").value;
        let cep = document.querySelector("#empresaCEP").value;

        let listaErros = [];
        if(nome == "") {
            listaErros.push("empresaNome");
        }
        if(cnpj == "") {
            listaErros.push("empresaCNPJ");
        }
        if(telefone == "") {
            listaErros.push("empresaTelefone");
        }
        if(email == "") {
            listaErros.push("empresaEmail");
        }
        if(endereco == "") {
            listaErros.push("empresaEndereco");
        }
        if(cidade == "") {
            listaErros.push("empresaCidade");
        }
        if(estado == "") {
            listaErros.push("empresaEstado");
        }
        if(cep == "") {
            listaErros.push("empresaCEP");
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                nome: nome,
                cnpj: cnpj,
                telefone: telefone,
                email: email,
                endereco: endereco,
                cidade: cidade,
                estado: estado,
                cep: cep,
            }

            fetch("/empresas/cadastrar", {
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
                    window.location.href="/empresas";
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