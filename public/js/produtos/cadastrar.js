document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("produtoNome").style["border-color"] = "#ced4da";
        document.getElementById("produtoDesc").style["border-color"] = "#ced4da";
        document.getElementById("produtoPreco").style["border-color"] = "#ced4da";
        document.getElementById("produtoQuant").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let nome = document.querySelector("#produtoNome").value;
        let descricao = document.querySelector("#produtoDesc").value;
        let preco = document.querySelector("#produtoPreco").value;
        let quantidade = document.querySelector("#produtoQuant").value;

        let listaErros = [];
        if(nome == "") {
            listaErros.push("produtoNome");
        }
        if(descricao == "") {
            listaErros.push("produtoDesc");
        }
        if(preco == "") {
            listaErros.push("produtoPreco");
        }
        if(quantidade == 0) {
            listaErros.push("produtoQuant");
        }


        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                nome: nome,
                descricao: descricao,
                preco: preco,
                quantidade: quantidade,
            }

            fetch("/produtos/cadastrar", {
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
                    window.location.href="/produtos";
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