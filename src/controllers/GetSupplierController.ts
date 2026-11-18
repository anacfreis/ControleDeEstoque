
import { Request, Response } from 'express';
import GetSupplierService from '../services/supplier/GetSupplierService';

class GetSupplierController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado!' });
    }

    const getSupplierService = new GetSupplierService();

    try {
      const supplier = await getSupplierService.execute({
        id: Number(id),
        userId,
      });

      return res.status(200).json(supplier);
    } catch (error) {
      if (error instanceof Error && error.message === 'Fornecedor não encontrado!') {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Erro ao buscar fornecedor!' });
    }
  }
}

export default GetSupplierController;
