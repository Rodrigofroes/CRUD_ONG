const express = require('express');
const empresaControllers = require('../controllers/empresaControllers');

const router = express.Router();

let control = new empresaControllers();

router.get("/", control.listagemView);
router.get("/cadastrar", control.cadastroView);
router.post("/cadastrar", control.cadastrar);
router.get("/alterar/:id", ctrl.alterarView);
router.post("/alterar", ctrl.alterar);
router.post("/excluir", control.excluir);

module.exports = router;
