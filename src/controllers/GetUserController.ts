
import { Request, Response } from 'express';
import GetUserService from '../services/user/GetUserService';

class GetUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    try {
      const getUserService = new GetUserService();
      const user = await getUserService.execute(id);

      res.status(200).json(user);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Usuário não encontrado!'
      ) {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({
        error: 'Erro interno ao buscar usuário.',
      });
    }
  }
}

export default GetUserController;
