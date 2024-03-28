const express = require('express');
const empresaControllers = require('../controllers/empresaControllers');

let control = new empresaControllers();

<<<<<<< HEAD
const router = express.Router();
router.get('/',control.listagemView);
router.get('/cadastrar',control.cadastroView);
router.post('/cadastrar',control.cadastrar);
router.get('/alterar/:id', control.alterarView);
router.post("/alterar", control.alterar);
=======
router.get("/", control.listagemView);
router.get("/cadastrar", control.cadastroView);
router.post("/cadastrar", control.cadastrar);
router.get("/alterar/:id", ctrl.alterarView);
router.post("/alterar", ctrl.alterar);
>>>>>>> 22e233f93fb17f663dfbc1634e19ce7d0cc64691
router.post("/excluir", control.excluir);

module.exports = router;
