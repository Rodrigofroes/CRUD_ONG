const volutarioModel = require('../model/voluntarioModel')

class voluntariosControllers{

    cadastrarVoluntarios(req, res){
        res.render('voluntario/cadastroVoluntarios');
    }

    alterarVoluntarios(req, res){
        console.log(req.params.id);
        let usuario = new volutarioModel();
        let lista = usuario.obter(req.params.id);
        res.render('voluntario/alterarVoluntarios', {lista: lista});
    }

    async listarVoluntarios(req, res){
        let usuario = new volutarioModel();
        let listaVoluntarios = await usuario.listar()
        res.render('voluntario/listagemVoluntarios', {
            lista: listaVoluntarios
        });
    }

    async cadastrar(req, res){
        if(req.body.nome != "", req.body.email != "", req.body.nascimento != 0, req.body.endereco != "", req.body.cep != 0, req.body.telefone != 0){
            let usuario = new volutarioModel(0, req.body.nome, req.body.email, req.body.endereco, req.body.nascimento, req.body.cep, req.body.telefone);
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

}
module.exports = voluntariosControllers;