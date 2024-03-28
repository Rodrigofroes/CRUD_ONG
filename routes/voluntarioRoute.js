const express = require('express');
const voluntarioController = require('../controllers/voluntarioController');

let control = new voluntarioController();

const router = express.Router();
router.get('/',control.listagemView);
router.get('/cadastrar',control.cadastroView);
router.post('/cadastrar',control.cadastrar);
router.get('/alterar/:id', control.alterarView);
router.post("/alterar", control.alterar);
router.post("/excluir", control.excluir);

module.exports = router;