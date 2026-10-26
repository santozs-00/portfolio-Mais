const { Router } = require('express');
const selecaoController = require('../controllers/selecaoController');
const { autenticar } = require('../middlewares/auth');

const router = Router();

router.get('/selecoes', selecaoController.listar);
router.post('/selecoes', autenticar, selecaoController.criar);
router.put('/selecoes/:id', autenticar, selecaoController.atualizar);
router.delete('/selecoes/:id', autenticar, selecaoController.deletar);

module.exports = router;
