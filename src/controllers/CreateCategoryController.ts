
import { Request, Response } from 'express';
import CreateCategoryService from '../services/category/CreateCategoryService';

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const userId = req.userId;

    try {
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }

      const createCategoryService = new CreateCategoryService();

      const category = await createCategoryService.execute({
        name,
        userId,
      });

      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno ao criar categoria.' });
    }
  }
}

export default CreateCategoryController;
