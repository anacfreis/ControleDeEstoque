
import { Request, Response } from 'express';
import GetAllProductsService from '../services/product/GetAllProductsService';

class GetAllProductsController {
  async handle(req: Request, res: Response): Promise<void> {
    const userId = req.userId;

    try {
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }

      const getAllProductsService = new GetAllProductsService();

      const products = await getAllProductsService.execute({
        userId,
      });

      res.status(200).json(products);
    } catch (error) {
      console.error('[GetAllProductsController.ts]', error);
      res.status(500).json({ error: 'Erro interno ao buscar produtos.' });
    }
  }
}

export default GetAllProductsController;
