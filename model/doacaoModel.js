const Database = require("../utils/database");

const banco = new Database();

class doacaoModel {
    #doacaoId;
    #doacaoValor;
    #doacaoData;
    #doacaoFormPag;
    #doadorId;
    #projetoId;
    #caixaId;

    constructor(doacaoId, doacaoValor, doacaoData, doacaoFormPag, doadorId, projetoId, caixaId) {
        this.#doacaoId = doacaoId;
        this.#doacaoValor = doacaoValor;
        this.#doacaoData = doacaoData;
        this.#doacaoFormPag = doacaoFormPag;
        this.#doadorId = doadorId;
        this.#projetoId = projetoId;
        this.#caixaId = caixaId;
    }

    get doacaoId() {
        return this.#doacaoId;
    }

    set doacaoId(novoDoacaoId) {
        this.#doacaoId = novoDoacaoId;
    }

    get doacaoValor() {
        return this.#doacaoValor;
    }

    set doacaoValor(novoDoacaoValor) {
        this.#doacaoValor = novoDoacaoValor;
    }

    get doacaoData() {
        return this.#doacaoData;
    }

    set doacaoData(novoDoacaoData) {
        this.#doacaoData = novoDoacaoData;
    }

    get doacaoFormPag() {
        return this.#doacaoFormPag;
    }

    set doacaoFormPag(novoDoacaoFormPag) {
        this.#doacaoFormPag = novoDoacaoFormPag;
    }

    get doadorId() {
        return this.#doadorId;
    }

    set doadorId(novoDoadorId) {
        this.#doadorId = novoDoadorId;
    }

    get projetoId() {
        return this.#projetoId;
    }

    set projetoId(novoProjetoId) {
        this.#projetoId = novoProjetoId;
    }

    get caixaId() {
        return this.#caixaId;
    }

    set caixaId(novoCaixaId) {
        this.#caixaId = novoCaixaId;
    }

    //função listar tudo
    async listar() {

        let sql = "select * from doacao"
        let lista = [];
 

        let rows = await banco.ExecutaComando(sql)
        

        for(let i = 0; i < rows.length; i++) {
            lista.push(new doacaoModel(rows[i]['id_doacao'], rows[i]['valor'], rows[i]['data_doacao'], rows[i]['forma_pagamento'], rows[i]['doador_id'], rows[i]['projeto_id'], rows[i]['caixa_id']))
        }
        return lista;
    }

    async cadastrar() {
       
            let sql = "insert into doacao (valor ,data_doacao , forma_pagamento, doador_id, projeto_id, caixa_id) values (?,?,?,?,?,?)";
        
            let valores =[
                this.#doacaoValor, this.#doacaoData, this.#doacaoFormPag, this.#doadorId, this.#projetoId, this.#caixaId, 
            ]

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
    }

}

module.exports = doacaoModel;
    