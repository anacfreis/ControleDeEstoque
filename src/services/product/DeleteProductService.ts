
import prisma from '../../config/prisma';

interface DeleteProductProps {
  id: number;
  userId: number;
}

class DeleteProductService {
  async execute({ id, userId }: DeleteProductProps) {
    const product = await prisma.product.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!product) {
      throw new Error('Produto não encontrado!');
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return { message: 'Produto excluído com sucesso!' };
  }
}

export default DeleteProductService;
