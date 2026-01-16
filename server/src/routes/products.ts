import express from 'express';
import { ProductController } from '../controllers/product.controller.js';

const router = express.Router();

// GET /api/products - Listar todos os produtos
router.get('/', ProductController.getAll);

// GET /api/products/:id - Buscar produto por ID
router.get('/:id', ProductController.getById);

// POST /api/products - Criar novo produto
router.post('/', ProductController.create);

// PUT /api/products/:id - Atualizar produto
router.put('/:id', ProductController.update);

// DELETE /api/products/:id - Deletar produto
router.delete('/:id', ProductController.delete);

export default router;
