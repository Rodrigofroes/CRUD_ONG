const empresaModel = require("../model/empresaModel");

class empresaController {
    async listagemView (req, resp) {
        let empresa = new empresaModel();
        let listaEmpresa = await empresa.listar()

        resp.render("empresas/listagem", {lista: listaEmpresa});
    }

    async cadastroView(req, resp) {
        let empresa = new empresaModel();
        let listaEmpresa = await empresa.listar()
        resp.render("empresas/cadastro", {listaPerfil: listaEmpresa});
    }

    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.nome != "" && req.body.cnpj != "" && req.body.telefone != "" && req.body.email != "" && req.body.endereco != "" && req.body.cidade != "" 
        && req.body.estado != "" && req.body.cep != "") {

            let empresa = new empresaModel(0, req.body.nome, req.body.cnpj, req.body.telefone, 
            req.body.email, req.body.endereco, req.body.cidade, req.body.estado, req.body.cep);

            let result = await empresa.cadastrar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Empresa cadastrado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar empresa!"
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
        console.log(req.params);
        let empresa = new empresaModel();
        empresa = await empresa.obter(req.params.id);
        res.render('empresas/alterar', {empresa: empresa})
    }

    async alterar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.id > 0 && req.body.nome != "" && req.body.cnpj != "" && req.body.telefone != "" && req.body.email != "" && req.body.endereco != "" && req.body.cidade != "" 
        && req.body.estado != "" && req.body.cep != "") {

            let empresa = new empresaModel(req.body.id, req.body.nome, req.body.cnpj, req.body.telefone, 
            req.body.email, req.body.endereco, req.body.cidade, req.body.estado, req.body.cep);

            let result = await empresa.cadastrar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Empresa alterada com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar empresa!"
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
            let empresa = new empresaModel();
            let ok = await empresa.excluir(req.body.id);
            if(ok) {
                res.send({ok: true});
            }
            else{
                res.send({ok: false, msg: "Erro ao excluir empresa"})
            }
        }
        else{
            res.send({ok: false, msg: "O id para exclusão não foi enviado"})
        }
    }
}

module.exports = empresaController