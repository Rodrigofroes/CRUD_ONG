document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("doacaoValor").style["border-color"] = "#ced4da";
        document.getElementById("doacaoData").style["border-color"] = "#ced4da";
        document.getElementById("doacaoPag").style["border-color"] = "#ced4da";
        document.getElementById("doacaoDoadorId").style["border-color"] = "#ced4da";
        document.getElementById("doacaoProjetoId").style["border-color"] = "#ced4da";
        document.getElementById("doacaoCaixaId").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        console.log("ola mundo");
        limparValidacao();
        let valor = document.querySelector("#doacaoValor").value;
        let data = document.querySelector("#doacaoData").value;
        let pagamento = document.querySelector("#doacaoPag").value;
        let doadorId = document.querySelector("#doacaoDoadorId").value;
        let projetoId = document.querySelector("#doacaoProjetoId").value;
        let caixaId = document.querySelector("#doacaoCaixaId").value;
        
        let listaErros = [];
        if(valor == "") {
            listaErros.push("doacaoValor");
        }
        if(data == "") {
            listaErros.push("doacaoData");
        }
        if(pagamento == "") {
            listaErros.push("doacaoPag");
        }
        if(doadorId == "") {
            listaErros.push("doacaoDoadorId");
        }
        if(projetoId == "") {
            listaErros.push("doacaoProjetoId");
        }
        if(caixaId == "") {
            listaErros.push("doacaoCaixaId");
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                valor: valor,
                data: data,
                pagamento: pagamento,
                doadorId: doadorId,
                projetoId: projetoId,
                caixaId: caixaId,
            }
            fetch("/doacoes/cadastrar", {
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
                    window.location.href="/doacoes";
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