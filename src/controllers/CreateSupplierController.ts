
import { Request, Response } from 'express';
import CreateSupplierService from '../services/supplier/CreateSupplierService';

class CreateSupplierController {
  async handle(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado!' });
    }

    const createSupplierService = new CreateSupplierService();

    try {
      const supplier = await createSupplierService.execute({
        name,
        email,
        phone,
        userId,
      });

      return res.status(201).json(supplier);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cadastrar fornecedor!' });
    }
  }
}

export default CreateSupplierController;
