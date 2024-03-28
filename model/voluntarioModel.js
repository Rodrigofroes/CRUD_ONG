const Database = require("../utils/database");

const banco = new Database();

class voluntarioModel {
    #voluntarioId;
    #voluntarioNome;
    #voluntarioEmail;
    #voluntarioTelefone;
    #voluntarioDataNasc;
    #voluntarioEndereco;
    #voluntarioCEP;

    get voluntarioId() {
        return this.#voluntarioId;
    }

    get voluntarioNome() {
        return this.#voluntarioNome;
    }

    get voluntarioEmail() {
        return this.#voluntarioEmail;
    }

    get voluntarioTelefone() {
        return this.#voluntarioTelefone;
    }

    get voluntarioDataNasc() {
        return this.#voluntarioDataNasc;
    }

    get voluntarioEndereco() {
        return this.#voluntarioEndereco;
    }

    get voluntarioCEP() {
        return this.#voluntarioCEP;
    }

    // Setters
    set voluntarioId(novaVoluntarioId) {
        this.#voluntarioId = novaVoluntarioId;
    }

    set voluntarioNome(novoVoluntarioNome) {
        this.#voluntarioNome = novoVoluntarioNome;
    }

    set voluntarioEmail(novoVoluntarioEmail) {
        this.#voluntarioEmail = novoVoluntarioEmail;
    }

    set voluntarioTelefone(novoVoluntarioTelefone) {
        this.#voluntarioTelefone = novoVoluntarioTelefone;
    }

    set voluntarioDataNasc(novoVoluntarioDataNasc) {
        this.#voluntarioDataNasc = novoVoluntarioDataNasc;
    }

    set voluntarioEndereco(novoVoluntarioEndereco) {
        this.#voluntarioEndereco = novoVoluntarioEndereco;
    }

    set voluntarioCEP(novoVoluntarioCEP) {
        this.#voluntarioCEP = novoVoluntarioCEP;
    }


    //construtor
    constructor(voluntarioId, voluntarioNome, voluntarioEmail, voluntarioTelefone, voluntarioDataNasc, voluntarioEndereco, voluntarioCEP) {
        this.#voluntarioId = voluntarioId;
        this.#voluntarioNome = voluntarioNome;
        this.#voluntarioEmail = voluntarioEmail;
        this.#voluntarioTelefone = voluntarioTelefone;
        this.#voluntarioDataNasc = voluntarioDataNasc;
        this.#voluntarioEndereco = voluntarioEndereco;
        this.#voluntarioCEP = voluntarioCEP;
    }

    //função listar tudo
    async listar() {

        let sql = "select * from voluntario"
        let lista = [];
 

        let rows = await banco.ExecutaComando(sql)
        

        for(let i = 0; i < rows.length; i++) {
            lista.push(new voluntarioModel(rows[i]['id_voluntario'], rows[i]['nome'], rows[i]['email'], rows[i]['telefone'], rows[i]['data_nascimento'], rows[i]['endereco'], rows[i]['CEP']))
        }
        return lista;
    }

    //função cadastrar
    async cadastrar() {
        if(this.#voluntarioId == 0){
            let sql = "insert into voluntario (nome ,email , telefone, data_nascimento, endereco, CEP) values (?,?,?,?,?,?)";

            let valores =[
                this.#voluntarioNome, this.#voluntarioEmail, this.#voluntarioTelefone, this.#voluntarioDataNasc, this.#voluntarioEndereco, this.#voluntarioCEP
            ]

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;

        }  else{
            let sql = "update voluntario set nome = ?, email = ?, telefone = ?, data_nascimento = ?, endereco = ?, CEP = ? where id_voluntario = ?";

            let valores = [this.#voluntarioNome, this.#voluntarioEmail, this.#voluntarioTelefone, this.#voluntarioDataNasc, this.#voluntarioEndereco, this.#voluntarioCEP, this.#voluntarioId];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
     }

     async obter(id) {
        let sql = "select * from voluntario where id_voluntario = ?"

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new voluntarioModel(row['id_voluntario'], row['nome'] ,row['email'] , row['telefone'], row['data_nascimento'], row['endereco'], row['CEP']);
        }
        return null;
    }

    async excluir(id) {
        let sql = "delete from voluntario where id_voluntario = ?";

        let valores = [id];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = voluntarioModel;