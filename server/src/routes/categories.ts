import express from 'express';
import { CategoryController } from '../controllers/category.controller.js';

const router = express.Router();

// GET /api/categories - Listar todas as categorias
router.get('/', CategoryController.getAll);

// GET /api/categories/:id - Buscar categoria por ID
router.get('/:id', CategoryController.getById);

// POST /api/categories - Criar nova categoria
router.post('/', CategoryController.create);

export default router;
