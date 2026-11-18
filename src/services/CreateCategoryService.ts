
import prisma from '../../config/prisma';

interface CreateCategoryProps {
  name: string;
  userId: number;
}

class CreateCategoryService {
  async execute({ name, userId }: CreateCategoryProps) {
    const category = await prisma.category.create({
      data: {
        name,
        userId,
      },
    });

    return category;
  }
}

export default CreateCategoryService;
