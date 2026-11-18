
import { Request, Response } from 'express';
import UpdateCategoryService from '../services/category/UpdateCategoryService';

class UpdateCategoryController {
  async handle(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { name } = req.body;
    const userId = req.userId;

    try {
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }

      const updateCategoryService = new UpdateCategoryService();

      const category = await updateCategoryService.execute({
        id,
        name,
        userId,
      });

      res.status(200).json(category);
    } catch (error) {
      if (error instanceof Error && error.message === 'Categoria não encontrada!') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro interno ao atualizar categoria.' });
    }
  }
}

export default UpdateCategoryController;
