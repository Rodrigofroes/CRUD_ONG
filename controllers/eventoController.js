const eventoModel = require("../model/eventoModel");

class eventoController {
    
    async listagemView (req, resp) {
        let evento = new eventoModel();
        let listaEvento = await evento.listar()

        resp.render("eventos/listagem", {lista: listaEvento});
    }

    async cadastroView(req, resp) {
        resp.render("eventos/cadastro");
        
    }

    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.nome != "" && req.body.descricao != "" && req.body.dataInic != "" && req.body.dataFim != "" && req.body.local != "" && req.body.projeto != "") {

            let evento = new eventoModel(0, req.body.nome, req.body.descricao, req.body.dataInic, 
            req.body.dataFim, req.body.local, req.body.projeto);

            let result = await evento.cadastrar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "evento cadastrado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar evento!"
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
        let evento = new eventoModel();
        evento = await evento.obter(req.params.id);
        res.render('eventos/alterar', {evento: evento})
    }

    async alterar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.id > 0 && req.body.nome != "" && req.body.descricao != "" && req.body.dataInic != "" && req.body.dataFim != "" && req.body.local != "" && req.body.projeto != "") {

            let evento = new eventoModel(req.body.id, req.body.nome, req.body.descricao, req.body.dataInic, 
                req.body.dataFim, req.body.local, req.body.projeto);

            let result = await evento.cadastrar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "evento alterada com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar evento!"
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
            let evento = new eventoModel();
            let ok = await evento.excluir(req.body.id);
            if(ok) {
                res.send({ok: true});
            }
            else{
                res.send({ok: false, msg: "Erro ao excluir evento"})
            }
        }
        else{
            res.send({ok: false, msg: "O id para exclusão não foi enviado"})
        }
    }
}

module.exports = eventoController