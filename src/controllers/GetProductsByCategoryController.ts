
import { Request, Response } from 'express';
import GetProductsByCategoryService from '../services/product/GetProductsByCategoryService';

class GetProductsByCategoryController {
  async handle(req: Request, res: Response): Promise<void> {
    const categoryId = Number(req.params.categoryId);
    const userId = req.userId;

    try {
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }

      const getProductsByCategoryService = new GetProductsByCategoryService();

      const products = await getProductsByCategoryService.execute({
        categoryId,
        userId,
      });

      res.status(200).json(products);
    } catch (error) {
      if (error instanceof Error && error.message === 'Categoria não encontrada!') {
        res.status(404).json({ error: error.message });
        return;
      }

      console.error('[GetProductsByCategoryController.ts]', error);
      res.status(500).json({ error: 'Erro interno ao buscar produtos.' });
    }
  }
}

export default GetProductsByCategoryController;
