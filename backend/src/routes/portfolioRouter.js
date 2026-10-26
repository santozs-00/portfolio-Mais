const { Router } = require('express');
const portfolioController = require('../controllers/portfolioController');
const { autenticar } = require('../middlewares/auth');

const router = Router();

router.use('/portfolios', autenticar);
router.get('/portfolios', portfolioController.listar);
router.post('/portfolios', portfolioController.criar);
router.put('/portfolios/:id', portfolioController.atualizar);
router.delete('/portfolios/:id', portfolioController.deletar);

module.exports = router;
