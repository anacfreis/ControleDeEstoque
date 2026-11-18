
import { Request, Response } from 'express';
import DeleteSupplierService from '../services/supplier/DeleteSupplierService';

class DeleteSupplierController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado!' });
    }

    const deleteSupplierService = new DeleteSupplierService();

    try {
      const result = await deleteSupplierService.execute({
        id: Number(id),
        userId,
      });

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Fornecedor não encontrado!') {
          return res.status(404).json({ error: error.message });
        }

        if (error.message === 'Não é possível excluir um fornecedor que possui produtos!') {
          return res.status(400).json({ error: error.message });
        }
      }

      return res.status(500).json({ error: 'Erro ao excluir fornecedor!' });
    }
  }
}

export default DeleteSupplierController;
