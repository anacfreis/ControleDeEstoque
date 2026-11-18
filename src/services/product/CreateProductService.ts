
import prisma from '../../config/prisma';

interface CreateProductProps {
  name: string;
  price: number;
  categoryId: number;
  supplierId: number;
  userId: number;
  image?: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    categoryId,
    supplierId,
    userId,
    image,
  }: CreateProductProps) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada!');
    }

    const supplier = await prisma.supplier.findFirst({
      where: {
        id: supplierId,
        userId,
      },
    });

    if (!supplier) {
      throw new Error('Fornecedor não encontrado!');
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        supplierId,
        userId,
        image,
      },
    });

    return product;
  }
}

export default CreateProductService;
