const voluntarioModel = require('../model/voluntarioModel');

class voluntariosControllers{

    cadastrarVoluntarios(req, res){
        res.render('voluntario/cadastroVoluntarios');
    }

    async alterarVoluntarios(req, res){
        console.log(req.params);
        let usuario =  new voluntarioModel();
        usuario = await usuario.obter(req.params.id);
        res.render('voluntario/alterarVoluntarios', {usuario: usuario});
    }

    async listarVoluntarios(req, res){
        let usuario = new voluntarioModel();
        let listaVoluntarios = await usuario.listar()
        res.render('voluntario/listagemVoluntarios', {
            lista: listaVoluntarios
        });
    }

    async excluir(req, res){
        let usuario = new voluntarioModel();
        let result = await usuario.exluir(req.body.id);

        if(result) {
            res.send({
                ok: true,
                msg: "Usuário excluido com sucesso!"
            });
        }   
        else{
            res.send({
                ok: false,
                msg: "Erro ao excluir usuário!"
            });
        }
    }

    async cadastrar(req, res){
        if(req.body.nome != "", req.body.email != "", req.body.nascimento != 0, req.body.endereco != "", req.body.cep != 0, req.body.telefone != 0){
            let usuario = new voluntarioModel(0, req.body.nome, req.body.email, req.body.endereco, req.body.nascimento, req.body.cep, req.body.telefone);
            let result = await usuario.cadastrar(); 

            if(result) {
                res.send({
                    ok: true,
                    msg: "Usuário cadastrado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar usuário!"
                });
            }
        }
    }

    async alterarValor(req, res){
        if(req.body.nome != "", req.body.email != "", req.body.nascimento != 0, req.body.endereco != "", req.body.cep != 0, req.body.telefone != 0) {
            let usuario = new voluntarioModel(req.body.id, req.body.nome, req.body.email, req.body.endereco, req.body.nascimento, req.body.cep, req.body.telefone);

            let result = await usuario.alterar();

            if(result) {
                res.send({
                    ok: true,
                    msg: "Usuário alterado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: "Erro ao alterar usuário!"
                });
            }
        }
        else
        {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

}
module.exports = voluntariosControllers;