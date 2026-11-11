
import prisma from '../../config/prisma';
import bcrypt from 'bcryptjs';

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    // Verifica se o usuário já existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('Usuário já cadastrado!');
    }

    // Gera o hash da senha
    const passwordHash = await bcrypt.hash(password, 8);

    // Cria o usuário no banco
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export default CreateUserService;
