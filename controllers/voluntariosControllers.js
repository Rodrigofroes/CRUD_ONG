class voluntariosControllers{

    cadastrarVoluntarios(req, res){
        res.render('voluntario/cadastroVoluntarios');
    }

    alterarVoluntarios(req, res){
        res.render('voluntario/alterarVoluntarios');
    }

    listarVoluntarios(req, res){
        res.render('voluntario/listagemVoluntarios');
    }

}
module.exports = voluntariosControllers;