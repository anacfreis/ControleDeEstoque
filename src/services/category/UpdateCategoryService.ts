
import prisma from '../../config/prisma';

interface UpdateCategoryProps {
  id: number;
  name: string;
  userId: number;
}

class UpdateCategoryService {
  async execute({ id, name, userId }: UpdateCategoryProps) {
    const category = await prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada!');
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return updatedCategory;
  }
}

export default UpdateCategoryService;
