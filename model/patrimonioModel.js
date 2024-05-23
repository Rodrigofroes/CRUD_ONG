const Database = require("../utils/database");

const banco = new Database();

class patrimonioModel {
    #patrimonioId;
    #patrimonioNome;
    #patrimonioDescricao;
    #patrimonioQuantidade;
    #projetoId;

    constructor(patrimonioId, patrimonioNome, patrimonioDescricao, patrimonioQuantidade, projetoId) {
        this.#patrimonioId = patrimonioId;
        this.#patrimonioNome = patrimonioNome;
        this.#patrimonioDescricao = patrimonioDescricao;
        this.#patrimonioQuantidade = patrimonioQuantidade;
        this.#projetoId = projetoId;
    }

    get patrimonioId() { return this.#patrimonioId; }
    set patrimonioId(novopatrimonioId) { this.#patrimonioId = novopatrimonioId; }

    get patrimonioNome() { return this.#patrimonioNome; }
    set patrimonioNome(novopatrimonioNome) { this.#patrimonioNome = novopatrimonioNome; }

    get patrimonioDescricao() { return this.#patrimonioDescricao; }
    set patrimonioDescricao(novopatrimonioDescricao) { this.#patrimonioDescricao = novopatrimonioDescricao; }

    get patrimonioQuantidade() { return this.#patrimonioQuantidade; }
    set patrimonioQuantidade(novopatrimonioQuantidade) { this.#patrimonioQuantidade = novopatrimonioQuantidade; }

    get projetoId() { return this.#projetoId; }
    set projetoId(novoprojetoId) { this.#projetoId = novoprojetoId; }

    //função listar tudo
    async listar() {

        let sql = "select * from patrimonio"
        let lista = [];


        let rows = await banco.ExecutaComando(sql)


        for (let i = 0; i < rows.length; i++) {
            lista.push(new patrimonioModel(rows[i]['id_patrimonio'], rows[i]['nome'], rows[i]['descricao'], rows[i]['quantidade'], rows[i]['projeto_id']))
        }
        return lista;
    }

    async validarEstoque(patrimonioId, quantidade) {

        let sql = "select * from patrimonio where id_patrimonio = ? and quantidade >= ?";
        let valores = [patrimonioId, quantidade];

        let rows = await banco.ExecutaComando(sql, valores);
        
        return rows.length > 0;
    }

    async cadastrar() {
        if (this.#patrimonioId == 0) {
            let sql = "insert into patrimonio (nome, descricao, quantidade, projeto_id) values (?,?,?,?)";

            let valores = [
                this.#patrimonioNome, this.#patrimonioDescricao, this.#patrimonioQuantidade, this.#projetoId,
            ]

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;

        } else {
            let sql = "update patrimonio set nome = ?, descricao = ?, quantidade = ?, projeto_id = ?";

            let valores = [
                this.#patrimonioNome, this.#patrimonioDescricao, this.patrimonioQuantidade, this.#projetoId,
            ]

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async obter(id) {
        let sql = "select * from patrimonio where id_patrimonio = ?"

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new patrimonioModel(row['id_patrimonio'], row['nome'], row['descricao'], row['quantidade'], row['projeto_id']);
        }
        return null;
    }

    async excluir(id) {

        let sqlForeign = "delete from tb_pedidoitenspatrimonio where id_patrimonio = ?; ";

        let sql = "delete from patrimonio where id_patrimonio = ?";

        let valores = [id];
        await banco.ExecutaComandoNonQuery(sqlForeign, valores);
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }


    async buscarPatrimonio(id){
        let sql = "select * from patrimonio where id_patrimonio = ?;";
        let valores = [id];
        var rows = await banco.ExecutaComando(sql, valores);

        let patrimonio = null;

        if(rows.length > 0){
            var row = rows[0];
            
            patrimonio = new patrimonioModel(row['id_patrimonio'], row['nome'], row['descricao'], row['quantidade'], row['projeto_id']);
        }

        return patrimonio;
    }

    toJSON() {
        return {
            "patrimonioId": this.#patrimonioId,
            "patrimonioNome": this.#patrimonioNome,
            "patrimonioQuantidade": this.#patrimonioQuantidade,
        }
    }

}

module.exports = patrimonioModel;
