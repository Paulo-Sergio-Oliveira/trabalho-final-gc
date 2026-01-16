import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export class ProductController {
  // GET /api/products - Listar todos os produtos
  static async getAll(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  // GET /api/products/:id - Buscar produto por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  // POST /api/products - Criar novo produto
  static async create(req: Request, res: Response) {
    try {
      const { name, price, imageUrl, categoryId } = req.body;

      // Validação básica
      if (!name || !price || !imageUrl || !categoryId) {
        return res.status(400).json({
          error: 'Missing required fields: name, price, imageUrl, categoryId',
        });
      }

      // Verificar se a categoria existe
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      const product = await prisma.product.create({
        data: {
          name,
          price: parseFloat(price),
          imageUrl,
          categoryId,
        },
        include: {
          category: true,
        },
      });

      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  // PUT /api/products/:id - Atualizar produto
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, price, imageUrl, categoryId } = req.body;

      // Verificar se o produto existe
      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Se categoryId foi fornecido, verificar se existe
      if (categoryId) {
        const category = await prisma.category.findUnique({
          where: { id: categoryId },
        });

        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }
      }

      const product = await prisma.product.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(price && { price: parseFloat(price) }),
          ...(imageUrl && { imageUrl }),
          ...(categoryId && { categoryId }),
        },
        include: {
          category: true,
        },
      });

      res.json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }

  // DELETE /api/products/:id - Deletar produto
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Verificar se o produto existe
      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await prisma.product.delete({
        where: { id },
      });

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
}
