
import { Request, Response } from 'express';
import AuthUserService from '../services/user/AuthUserService';

class AuthUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const authUserService = new AuthUserService();

      const user = await authUserService.execute({
        email,
        password,
      });

      res.status(200).json(user);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'E-mail ou senha incorretos!'
      ) {
        res.status(401).json({ error: error.message });
        return;
      }

      res.status(500).json({
        error: 'Erro interno ao autenticar usuário.',
      });
    }
  }
}

export default AuthUserController;
