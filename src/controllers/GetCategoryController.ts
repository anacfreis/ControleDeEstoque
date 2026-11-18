
import { Request, Response } from 'express';
import GetCategoryService from '../services/category/GetCategoryService';

class GetCategoryController {
  async handle(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const userId = req.userId;

    try {
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }

      const getCategoryService = new GetCategoryService();

      const category = await getCategoryService.execute({
        id,
        userId,
      });

      res.status(200).json(category);
    } catch (error) {
      if (error instanceof Error && error.message === 'Categoria não encontrada!') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro interno ao buscar categoria.' });
    }
  }
}

export default GetCategoryController;
