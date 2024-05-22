document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    function limparValidacao() {
        document.getElementById("patrimonioNome").style["border-color"] = "#ced4da";
        document.getElementById("patrimonioDesc").style["border-color"] = "#ced4da";
        document.getElementById("patrimonioQuantidade").style["border-color"] = "#ced4da";
        document.getElementById("patrimonioProjeto").style["border-color"] = "#ced4da";
    }

    function alterar() {
        limparValidacao();
        let id = document.querySelector("#patrimonioId").value;
        let nome = document.querySelector("#patrimonioNome").value;
        let descricao = document.querySelector("#patrimonioDesc").value;
        let quantidade = document.querySelector("#patrimonioQuantidade").value;
        let projeto = document.querySelector("#patrimonioProjeto").value;

        let listaErros = [];
        if(nome == "") {
            listaErros.push("patrimonioNome");
        }
        if(descricao == "") {
            listaErros.push("patrimonioDesc");
        }
        if(quantidade == "") {
            listaErros.push("patrimonioQuantidade");
        }
        if(projeto == 0) {
            listaErros.push("patrimonioProjeto");
        }
        

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                id: id,
                nome: nome,
                descricao: descricao,
                quantidade: quantidade,
                projeto: projeto,
            }

            fetch("/patrimonios/alterar", {
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
                    window.location.href="/patrimonios";
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