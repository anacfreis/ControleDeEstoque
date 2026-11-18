
import prisma from '../../config/prisma';

interface GetCategoryProps {
  id: number;
  userId: number;
}

class GetCategoryService {
  async execute({ id, userId }: GetCategoryProps) {
    const category = await prisma.category.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada!');
    }

    return category;
  }
}

export default GetCategoryService;
