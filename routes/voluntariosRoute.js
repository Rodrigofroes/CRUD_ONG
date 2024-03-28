const express = require('express');
const voluntariosControllers = require('../controllers/voluntariosControllers');

const router = express.Router();
let control = new voluntariosControllers();

router.get('/cadastrar', control.cadastrarVoluntarios)
router.post('/cadastrar', control.cadastrar)
router.get('/listagem', control.listarVoluntarios)
router.get('/alterar/:id', control.alterarVoluntarios)
router.post('/alterar', control.alterarVoluntarios)

module.exports = router;