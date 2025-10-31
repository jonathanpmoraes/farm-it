const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financial.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Todas as rotas requerem autenticação
router.use(authMiddleware);

router.get('/', financialController.getAll);
router.get('/report', financialController.getReport);
router.get('/monthly', financialController.getMonthlyStats);
router.get('/:id', financialController.getById);
router.post('/', financialController.create);
router.put('/:id', financialController.update);
router.delete('/:id', financialController.delete);

module.exports = router;

