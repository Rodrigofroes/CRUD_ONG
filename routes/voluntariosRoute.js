const express = require('express');
const voluntariosControllers = require('../controllers/voluntariosControllers');

const router = express.Router();
let control = new voluntariosControllers();

router.get('/cadastrar', control.cadastrarVoluntarios)
router.get('/alterar', control.alterarVoluntarios)
router.get('/listagem', control.listarVoluntarios)

module.exports = router;