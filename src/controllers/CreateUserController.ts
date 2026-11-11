
import { Request, Response } from 'express';
import CreateUserService from '../services/user/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        name,
        email,
        password,
      });

      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuário já cadastrado!') {
        res.status(400).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro interno ao criar usuário.' });
    }
  }
}

export default CreateUserController;
