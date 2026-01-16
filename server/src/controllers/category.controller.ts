import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export class CategoryController {
  // GET /api/categories - Listar todas as categorias
  static async getAll(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        orderBy: {
          name: 'asc',
        },
      });

      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }

  // GET /api/categories/:id - Buscar categoria por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          products: true,
        },
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  }

  // POST /api/categories - Criar nova categoria
  static async create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const category = await prisma.category.create({
        data: { name },
      });

      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  }
}
