import prisma from '../../config/prisma';
import { removeUpload } from '../../utils/removeUpload';

interface UpdateProductProps {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  supplierId: number;
  userId: number;
  image?: string;
}

class UpdateProductService {
  async execute({
    id,
    name,
    price,
    categoryId,
    supplierId,
    userId,
    image,
  }: UpdateProductProps) {
    const product = await prisma.product.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!product) {
      throw new Error('Produto não encontrado!');
    }

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

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        categoryId,
        supplierId,
        ...(image && { image }),
      },
    });

    // trocou a imagem: apaga a antiga do disco
    if (image && product.image) {
      await removeUpload(product.image);
    }

    return updatedProduct;
  }
}

export default UpdateProductService;