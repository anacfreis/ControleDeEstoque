
import prisma from '../../config/prisma';

class DeleteUserService {
  async execute(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado!');
    }

    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return { message: 'Usuário deletado com sucesso!' };
  }
}

export default DeleteUserService;
