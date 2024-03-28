const voluntarioModel = require("../model/voluntarioModel");

class voluntarioController {
    
    async listagemView (req, resp) {
        let voluntario = new voluntarioModel();
        let listaVoluntario = await voluntario.listar()

        resp.render("voluntarios/listagem", {lista: listaVoluntario});
    }

    async cadastroView(req, resp) {
        let voluntario = new voluntarioModel();
        let listaVoluntario = await voluntario.listar()
        resp.render("voluntarios/cadastro", {listaPerfil: listaVoluntario});
    }

    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.nome != "" && req.body.email != "" && req.body.telefone != "" && req.body.dataNasc != "" && req.body.endereco && req.body.cep != "") {
           
            let voluntario = new voluntarioModel(0, req.body.nome, req.body.email, req.body.telefone, req.body.dataNasc, req.body.endereco, req.body.cep);

            let result = await voluntario.cadastrar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Voluntario cadastrado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar voluntario!"
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
        let voluntario = new voluntarioModel();
        voluntario = await voluntario.obter(req.params.id);
        res.render('voluntarios/alterar', {voluntario: voluntario})
    }

    async alterar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.id > 0 && req.body.nome != "" && req.body.email != "" && req.body.telefone != "" && req.body.dataNasc != "" && req.body.endereco && req.body.cep != "") {

            let voluntario = new voluntarioModel(req.body.id, req.body.nome, req.body.email, req.body.telefone, req.body.dataNasc, req.body.endereco, req.body.cep);

            let result = await voluntario.cadastrar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "voluntario alterada com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar voluntario!"
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
            let voluntario = new voluntarioModel();
            let ok = await voluntario.excluir(req.body.id);
            if(ok) {
                res.send({ok: true});
            }
            else{
                res.send({ok: false, msg: "Erro ao excluir voluntario"})
            }
        }
        else{
            res.send({ok: false, msg: "O id para exclusão não foi enviado"})
        }
    }
}

module.exports = voluntarioController