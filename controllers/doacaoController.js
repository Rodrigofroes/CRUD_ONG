const doacaoModel = require("../model/doacaoModel");

class doacaoController {
    
    async listagemView (req, resp) {
        let doacao = new doacaoModel();
        let listaDoacao = await doacao.listar()

        resp.render("doacoes/listagem", {lista: listaDoacao});
    }

    async cadastroView(req, resp) {       
        resp.render("doacoes/cadastro");
    }
    
    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.valor != "" && req.body.data != "" && req.body.pagamento != "" && req.body.doadorId != "" && req.body.projetoId != "" && req.body.caixaId != "") {

            let doacao = new doacaoModel(0, req.body.valor, req.body.data, req.body.pagamento, 
            req.body.doadorId, req.body.projetoId, req.body.caixaId);

            let result = await doacao.cadastrar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Doação cadastrado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar Doação!"
                });
            }
        }
        else
        {
            resp.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }

    }
}

module.exports = doacaoController