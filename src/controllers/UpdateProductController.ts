
import { Request, Response } from 'express';
import UpdateProductService from '../services/product/UpdateProductService';

class UpdateProductController {
  async handle(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { name, price, categoryId, supplierId } = req.body;
    const userId = req.userId;
    const image = req.file?.filename;

    try {
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }

      const updateProductService = new UpdateProductService();

      const product = await updateProductService.execute({
        id,
        name,
        price: Number(price),
        categoryId: Number(categoryId),
        supplierId: Number(supplierId),
        userId,
        image,
      });

      res.status(200).json(product);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === 'Produto não encontrado!' ||
          error.message === 'Categoria não encontrada!' ||
          error.message === 'Fornecedor não encontrado!'
        ) {
          res.status(404).json({ error: error.message });
          return;
        }
      }

      console.error('[UpdateProductController.ts]', error);
      res.status(500).json({ error: 'Erro interno ao atualizar produto.' });
    }
  }
}

export default UpdateProductController;
