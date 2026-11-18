
import prisma from '../../config/prisma';

interface DeleteSupplierProps {
  id: number;
  userId: number;
}

class DeleteSupplierService {
  async execute({ id, userId }: DeleteSupplierProps) {
    const supplier = await prisma.supplier.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!supplier) {
      throw new Error('Fornecedor não encontrado!');
    }

    const productsCount = await prisma.product.count({
      where: {
        supplierId: id,
      },
    });

    if (productsCount > 0) {
      throw new Error('Não é possível excluir um fornecedor que possui produtos!');
    }

    await prisma.supplier.delete({
      where: { id },
    });

    return { message: 'Fornecedor excluído com sucesso!' };
  }
}

export default DeleteSupplierService;
