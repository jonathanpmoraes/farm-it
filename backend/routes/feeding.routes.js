const express = require('express');
const router = express.Router();
const feedingController = require('../controllers/feeding.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Rotas de alimentação
router.get('/', feedingController.getAll);
router.post('/', feedingController.create);
router.put('/:id', feedingController.update);
router.delete('/:id', feedingController.delete);
router.get('/stats', feedingController.getStats);

// Rotas de estoque
router.get('/inventory', feedingController.getInventory);
router.post('/inventory', feedingController.addToInventory);
router.put('/inventory/:id', feedingController.updateInventory);
router.delete('/inventory/:id', feedingController.deleteFromInventory);

module.exports = router;

