const express = require('express');
const doacaoControllers = require('../controllers/doacaoController');

let control = new doacaoControllers();

const router = express.Router();
router.get('/',control.listagemView);
router.get('/cadastrar',control.cadastroView);
router.post('/cadastrar',control.cadastrar);

module.exports = router;
