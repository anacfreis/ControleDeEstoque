
import prisma from '../../config/prisma';

interface GetProductsByCategoryProps {
  categoryId: number;
  userId: number;
}

class GetProductsByCategoryService {
  async execute({ categoryId, userId }: GetProductsByCategoryProps) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada!');
    }

    const products = await prisma.product.findMany({
      where: {
        categoryId,
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

export default GetProductsByCategoryService;
