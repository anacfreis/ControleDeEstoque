
import prisma from '../../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface AuthUserProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserProps) {
    // Busca o usuário pelo e-mail
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('E-mail ou senha incorretos!');
    }

    // Compara a senha informada com o hash salvo
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('E-mail ou senha incorretos!');
    }

    // Gera o token JWT
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET não configurado!');
    }

    const token = jwt.sign(
      { id: user.id },
      secret,
      { expiresIn: '30d' }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export default AuthUserService;
