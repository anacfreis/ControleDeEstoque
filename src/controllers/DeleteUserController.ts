
import { Request, Response } from 'express';
import DeleteUserService from '../services/user/DeleteUserService';

class DeleteUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    try {
      const deleteUserService = new DeleteUserService();

      const result = await deleteUserService.execute(id);

      res.status(200).json(result);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Usuário não encontrado!'
      ) {
        res.status(404).json({ error: error.message });
        return;
      }

      console.error('[DeleteUserController.ts]', error);
      res.status(500).json({
        error: 'Erro interno ao deletar usuário.',
      });
    }
  }
}

export default DeleteUserController;
