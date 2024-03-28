const Database = require("../utils/database");

const banco = new Database();

class empresaModel {
    #empresaId;
    #empresaNome;
    #empresaCNPJ;
    #empresaTelefone;
    #empresaEmail;
    #empresaEndereco;
    #empresaCidade;
    #empresaEstado;
    #empresaCEP;

    get empresaId() {
        return this.#empresaId;
    }

    get empresaNome() {
        return this.#empresaNome;
    }

    get empresaCNPJ() {
        return this.#empresaCNPJ;
    }

    get empresaTelefone() {
        return this.#empresaTelefone;
    }

    get empresaEmail() {
        return this.#empresaEmail;
    }

    get empresaEndereco() {
        return this.#empresaEndereco;
    }

    get empresaCidade() {
        return this.#empresaCidade;
    }

    get empresaEstado() {
        return this.#empresaEstado;
    }

    get empresaCEP() {
        return this.#empresaCEP;
    }

    // Setters
    set empresaId(novaEmpresaId) {
        this.#empresaId = novaEmpresaId;
    }

    set empresaNome(novoEmpresaNome) {
        this.#empresaNome = novoEmpresaNome;
    }

    set empresaCNPJ(novoEmpresaCNPJ) {
        this.#empresaCNPJ = novoEmpresaCNPJ;
    }

    set empresaTelefone(novoEmpresaTelefone) {
        this.#empresaTelefone = novoEmpresaTelefone;
    }

    set empresaEmail(novoEmpresaEmail) {
        this.#empresaEmail = novoEmpresaEmail;
    }

    set empresaEndereco(novoEmpresaEndereco) {
        this.#empresaEndereco = novoEmpresaEndereco;
    }

    set empresaCidade(novoEmpresaCidade) {
        this.#empresaCidade = novoEmpresaCidade;
    }

    set empresaEstado(novoEmpresaEstado) {
        this.#empresaEstado = novoEmpresaEstado;
    }

    set empresaCEP(novoEmpresaCEP) {
        this.#empresaCEP = novoEmpresaCEP;
    }

    //construtor
    constructor(empresaId, empresaNome, empresaCNPJ, empresaTelefone, empresaEmail, empresaEndereco, empresaCidade, empresaEstado, empresaCEP) {
        this.#empresaId = empresaId;
        this.#empresaNome = empresaNome;
        this.#empresaCNPJ = empresaCNPJ;
        this.#empresaTelefone = empresaTelefone;
        this.#empresaEmail = empresaEmail;
        this.#empresaEndereco = empresaEndereco;
        this.#empresaCidade = empresaCidade;
        this.#empresaEstado = empresaEstado;
        this.#empresaCEP = empresaCEP;
    }

    //função listar tudo
    async listar() {

        let sql = "select * from empresas_parceiras"
        let lista = [];
 

        let rows = await banco.ExecutaComando(sql)
        

        for(let i = 0; i < rows.length; i++) {
            lista.push(new empresaModel(rows[i]['id_empresa'], rows[i]['nome'], rows[i]['CNPJ'], rows[i]['telefone'], rows[i]['email'], rows[i]['endereco'], rows[i]['cidade'], rows[i]['estado'], rows[i]['CEP'] ))
        }
        return lista;
    }

    //função cadastrar
    async cadastrar() {
        if(this.#empresaId == 0){
            let sql = "insert into empresas_parceiras (nome ,CNPJ , telefone, email, endereco, cidade, estado, CEP) values (?,?,?,?,?,?,?,?)";
        
            let valores =[
                this.#empresaNome, this.#empresaCNPJ, this.#empresaTelefone, this.#empresaEmail, this.#empresaEndereco, this.#empresaCidade, this.#empresaEstado, this.#empresaCEP
            ]

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;

        }  else{
            let sql = "update empresas_parceiras set nome = ?, CNPJ = ?, telefone = ?, email = ?, endereco = ?, cidade = ?, estado = ?, CEP = ?";

            let valores =[
                this.#empresaNome, this.#empresaCNPJ, this.#empresaTelefone, this.#empresaEmail, this.#empresaEndereco, this.#empresaCidade, this.#empresaEstado, this.#empresaCEP
            ]

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
     }

     async obter(id) {
        let sql = "select * from empresas_parceiras where id_empresa = ?"

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new empresaModel(row['id_empresa'], row['nome'] ,row['CNPJ'] , row['telefone'], row['email'], row['endereco'], row['cidade'], row['estado'], row['CEP']);
        }
        return null;
    }

    async excluir(id) {
        let sql = "delete from empresas_parceiras where id_empresa = ?";

        let valores = [id];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = empresaModel;
    