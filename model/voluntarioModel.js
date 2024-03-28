const Database = require('../utils/database');
const banco = new Database();

class voluntarioModel {
    #voluntarioId;
    #voluntarioNome;
    #voluntarioEmail;
    #voluntarioEndereco;
    #voluntarioCep;
    #voluntarioNasc;
    #voluntarioTelefone

    get voluntarioId(){
        return this.#voluntarioId;
    }

    set voluntarioId(voluntarioId){
        this.#voluntarioId = voluntarioId;
    }

    get voluntarioNome(){
        return this.#voluntarioNome;
    }

    set voluntarioNome(voluntarioNome){
        this.#voluntarioNome = voluntarioNome;
    }

    get voluntarioEmail(){
        return this.#voluntarioEmail;
    }

    set voluntarioEmail(voluntarioEmail){
        this.#voluntarioEmail = voluntarioEmail;
    }

    get voluntarioEndereco(){
        return this.#voluntarioEndereco;
    }

    set voluntarioEndereco(voluntarioEndereco){
        this.#voluntarioEndereco = voluntarioEndereco;
    }

    get voluntarioCep(){
        return this.#voluntarioCep;
    }

    set voluntarioCep(voluntarioCep){
        this.#voluntarioCep = voluntarioCep;
    }

    get voluntarioNasc(){
        return this.#voluntarioNasc;
    }

    set voluntarioNasc(voluntarioNasc){
        this.#voluntarioNasc = voluntarioNasc;
    }

    get voluntarioTelefone(){
        return this.#voluntarioTelefone;
    }

    set voluntarioTelefone(voluntarioTelefone){
        this.#voluntarioTelefone = voluntarioTelefone;
    }

    constructor(voluntarioId,  voluntarioNome, voluntarioEmail, voluntarioEndereco, voluntarioNasc, voluntarioCep, voluntarioTelefone){
        this.#voluntarioId = voluntarioId;
        this.#voluntarioNome = voluntarioNome;
        this.#voluntarioEmail = voluntarioEmail;
        this.#voluntarioEndereco = voluntarioEndereco;
        this.#voluntarioNasc = voluntarioNasc;
        this.#voluntarioCep = voluntarioCep;
        this.#voluntarioTelefone = voluntarioTelefone;
    }

    async cadastrar(){
        if(this.#voluntarioId == 0){
            let sql = "insert teste (nome, email, telefone, data_nasciment, endereco, CEP) values (?,?,?,?,?,?)";
            let valores = [this.#voluntarioNome, this.#voluntarioEmail, this.#voluntarioTelefone, this.#voluntarioNasc, this.#voluntarioEndereco, this.#voluntarioCep];
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
        }
    }

    async listar() {
        let sql = "select * from teste";
    
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
    
        for(let i = 0; i < rows.length; i++) {
            lista.push(new voluntarioModel(rows[i]["id"],rows[i]["nome"], rows[i]["email"], rows[i]["endereco"], rows[i]["data_nasciment"],  rows[i]["cep"],  rows[i]["telefone"]));
        }
        return lista;
    }


    async obter(id) {
        let sql = "select * from teste where id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new UsuarioModel(row["id"], row["nome"], row["email"], row["endereco"], row["data_nasciment"], row["cep"]);
        }

        return null;
    }
    

}

module.exports = voluntarioModel;