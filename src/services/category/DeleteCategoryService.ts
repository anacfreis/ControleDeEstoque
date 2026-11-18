
import prisma from '../../config/prisma';

interface DeleteCategoryProps {
  id: number;
  userId: number;
}

class DeleteCategoryService {
  async execute({ id, userId }: DeleteCategoryProps) {
    const category = await prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada!');
    }

    if (await prisma.product.count({
      where: {
        categoryId: id,
      },
    })) {
      throw new Error('Não é possível excluir uma categoria que possui produtos!');
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return { message: 'Categoria excluída com sucesso!' };
  }
}

export default DeleteCategoryService;
