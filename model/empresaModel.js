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
            lista.push(new empresaModel(rows[i]['emp_id'], rows[i]['emp_nome'], rows[i]['emp_cnpj'], rows[i]['emp_telefone'], rows[i]['emp_email'], rows[i]['emp_endereco'], rows[i]['emp_cidade'], rows[i]['emp_estado'], rows[i]['emp_cep'] ))
        }
        return lista;
    }

    //função cadastrar
    async cadastrar() {
        if(this.#empresaId == 0){
            let sql = "insert into empresas_parceiras (emp_nome ,emp_cnpj , emp_telefone, emp_email, emp_endereco, emp_cidade, emp_estado, emp_cep) values (?,?,?,?,?,?,?,?,?)";
        
            let valores =[
                this.#empresaNome, this.#empresaCNPJ, this.#empresaTelefone, this.#empresaEmail, this.#empresaEndereco, this.#empresaCidade, this.#empresaEstado, this.#empresaCEP
            ]

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;

        }  else{
            let sql = "update empresas_parceiras set emp_nome = ?, emp_cnpj = ?, emp_telefone = ?, emp_email = ?, emp_endereco = ?, emp_cidade = ?, emp_estado = ?, emp_cep = ?";

            let valores =[
                this.#empresaNome, this.#empresaCNPJ, this.#empresaTelefone, this.#empresaEmail, this.#empresaEndereco, this.#empresaCidade, this.#empresaEstado, this.#empresaCEP
            ]

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
     }

     async obter(id) {
        let sql = "select * from empresas_parceiras where usu_id = ?"

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new empresaModel(row['emp_id'], row['emp_nome'] ,row['emp_cnpj'] , row['emp_telefone'], row['emp_email'], row['emp_endereco'], row['emp_cidade'], row['emp_estado'], row['emp_cep']);
        }
        return null;
    }

     async excluir(id) {
        let sql = "delete from empresas_parceiras where emp_id = ?"

        let valores = [id]

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
     }

}

module.exports = empresaModel;
    