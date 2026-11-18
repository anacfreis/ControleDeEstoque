
import prisma from '../../config/prisma';

interface GetProductProps {
  id: number;
  userId: number;
}

class GetProductService {
  async execute({ id, userId }: GetProductProps) {
    const product = await prisma.product.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: true,
        supplier: true,
      },
    });

    if (!product) {
      throw new Error('Produto não encontrado!');
    }

    return product;
  }
}

export default GetProductService;
