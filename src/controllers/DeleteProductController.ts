
import { Request, Response } from 'express';
import DeleteProductService from '../services/product/DeleteProductService';

class DeleteProductController {
  async handle(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const userId = req.userId;

    try {
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }

      const deleteProductService = new DeleteProductService();

      const result = await deleteProductService.execute({
        id,
        userId,
      });

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Produto não encontrado!') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro interno ao excluir produto.' });
    }
  }
}

export default DeleteProductController;
