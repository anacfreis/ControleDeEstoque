
import { Request, Response } from 'express';
import GetProductService from '../services/product/GetProductService';

class GetProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado!' });
    }

    const getProductService = new GetProductService();

    try {
      const product = await getProductService.execute({
        id: Number(id),
        userId,
      });

      return res.status(200).json(product);
    } catch (error) {
      if (error instanceof Error && error.message === 'Produto não encontrado!') {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Erro ao buscar produto!' });
    }
  }
}

export default GetProductController;
