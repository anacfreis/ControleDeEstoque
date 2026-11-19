
import { Request, Response } from 'express';
import DeleteCategoryService from '../services/category/DeleteCategoryService';

class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const userId = req.userId;

    try {
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }

      const deleteCategoryService = new DeleteCategoryService();

      const result = await deleteCategoryService.execute({
        id,
        userId,
      });

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Categoria não encontrada!') {
          res.status(404).json({ error: error.message });
          return;
        }

        if (error.message === 'Não é possível excluir uma categoria que possui produtos!') {
          res.status(400).json({ error: error.message });
          return;
        }
      }

      console.error('[DeleteCategoryController.ts]', error);
      res.status(500).json({ error: 'Erro interno ao excluir categoria.' });
    }
  }
}

export default DeleteCategoryController;
