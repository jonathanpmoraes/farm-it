const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animal.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Todas as rotas requerem autenticação
router.use(authMiddleware);

router.get('/', animalController.getAll);
router.get('/stats', animalController.getStats);
router.get('/:id', animalController.getById);
router.post('/', animalController.create);
router.put('/:id', animalController.update);
router.delete('/:id', animalController.delete);

module.exports = router;

