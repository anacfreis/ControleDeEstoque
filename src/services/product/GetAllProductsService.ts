
import prisma from '../../config/prisma';

interface GetAllProductsProps {
  userId: number;
}

class GetAllProductsService {
  async execute({ userId }: GetAllProductsProps) {
    const products = await prisma.product.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
        supplier: true,
      },
    });

    return products;
  }
}

export default GetAllProductsService;
