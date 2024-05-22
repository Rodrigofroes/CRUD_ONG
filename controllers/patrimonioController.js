const patrimonioModel = require("../model/patrimonioModel");

class patrimonioController {
    
    async listagemView (req, resp) {
        let patrimonio = new patrimonioModel();
        let listapatrimonio = await patrimonio.listar()

        resp.render("patrimonios/listagem", {lista: listapatrimonio});
    }

    async cadastroView(req, resp) {
        resp.render("patrimonios/cadastro");
        
    }

    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.nome != "" && req.body.descricao != "" && req.body.quantidade != "" && req.body.projeto != "") {

            let patrimonio = new patrimonioModel(0, req.body.nome, req.body.descricao, req.body.quantidade, req.body.projeto);

            let result = await patrimonio.cadastrar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "patrimonio cadastrado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar patrimonio!"
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

    async alterarView(req, res) {
        let patrimonio = new patrimonioModel();
        patrimonio = await patrimonio.obter(req.params.id);
        res.render('patrimonios/alterar', {patrimonio: patrimonio})
    }

    async alterar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.id > 0 && req.body.nome != "" && req.body.descricao != "" && req.body.quantidade != "" && req.body.projeto != "") {

            let patrimonio = new patrimonioModel(req.body.id, req.body.nome, req.body.descricao, req.body.quantidade, req.body.projeto);

            let result = await patrimonio.cadastrar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "patrimonio alterada com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar patrimonio!"
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

    async excluir(req, res) {
        if(req.body.id != null) {
            let patrimonio = new patrimonioModel();
            let ok = await patrimonio.excluir(req.body.id);
            if(ok) {
                res.send({ok: true});
            }
            else{
                res.send({ok: false, msg: "Erro ao excluir patrimonio"})
            }
        }
        else{
            res.send({ok: false, msg: "O id para exclusão não foi enviado"})
        }
    }
}

module.exports = patrimonioController