import express, { Request, Response } from 'express';
import productRoutes from './products.js';
import categoryRoutes from './categories.js';

const router = express.Router();

// API root endpoint
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'API is working!',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
    }
  });
});

// Product routes
router.use('/products', productRoutes);

// Category routes
router.use('/categories', categoryRoutes);

export default router;
