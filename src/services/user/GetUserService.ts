
import prisma from '../../config/prisma';

class GetUserService {
  async execute(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado!');
    }

    return user;
  }
}

export default GetUserService;
