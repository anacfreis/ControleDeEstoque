
import { Request, Response } from 'express';
import UpdateSupplierService from '../services/supplier/UpdateSupplierService';

class UpdateSupplierController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado!' });
    }

    const updateSupplierService = new UpdateSupplierService();

    try {
      const supplier = await updateSupplierService.execute({
        id: Number(id),
        name,
        email,
        phone,
        userId,
      });

      return res.status(200).json(supplier);
    } catch (error) {
      if (error instanceof Error && error.message === 'Fornecedor não encontrado!') {
        return res.status(404).json({ error: error.message });
      }

      console.error('[UpdateSupplierController.ts]', error);
      return res.status(500).json({ error: 'Erro ao atualizar fornecedor!' });
    }
  }
}

export default UpdateSupplierController;
