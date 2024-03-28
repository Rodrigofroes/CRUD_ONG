const express = require('express');
const voluntariosControllers = require('../controllers/voluntariosControllers');

const router = express.Router();
let control = new voluntariosControllers();

router.get('/cadastrar', control.cadastrarVoluntarios)
router.post('/cadastrar', control.cadastrar)
router.get('/listagem', control.listarVoluntarios)
router.post('/excluir', control.excluir)
router.get('/alterar/:id', control.alterarVoluntarios)
router.post('/alterar', control.alterarValor)

module.exports = router;