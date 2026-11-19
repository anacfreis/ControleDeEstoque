
import { Request, Response } from 'express';
import CreateProductService from '../services/product/CreateProductService';

class CreateProductController {
  async handle(req: Request, res: Response): Promise<void> {
    const { name, price, categoryId, supplierId } = req.body;
    const userId = req.userId;
    const image = req.file?.filename;

    try {
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }

      const createProductService = new CreateProductService();

      const product = await createProductService.execute({
        name,
        price: Number(price),
        categoryId: Number(categoryId),
        supplierId: Number(supplierId),
        userId,
        image,
      });

      res.status(201).json(product);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === 'Categoria não encontrada!' ||
          error.message === 'Fornecedor não encontrado!'
        ) {
          res.status(404).json({ error: error.message });
          return;
        }
      }

      console.error('[CreateProductController.ts]', error);
      res.status(500).json({ error: 'Erro interno ao criar produto.' });
    }
  }
}

export default CreateProductController;
