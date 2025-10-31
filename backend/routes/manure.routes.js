const express = require('express');
const router = express.Router();
const manureController = require('../controllers/manure.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Rotas de produção
router.get('/production', manureController.getProduction);
router.post('/production', manureController.createProduction);
router.put('/production/:id', manureController.updateProduction);
router.delete('/production/:id', manureController.deleteProduction);

// Rotas de vendas
router.get('/sales', manureController.getSales);
router.post('/sales', manureController.createSale);
router.put('/sales/:id', manureController.updateSale);
router.delete('/sales/:id', manureController.deleteSale);

// Estatísticas
router.get('/stats', manureController.getStats);

module.exports = router;

