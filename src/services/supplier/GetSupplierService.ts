
import prisma from '../../config/prisma';

interface GetSupplierProps {
  id: number;
  userId: number;
}

class GetSupplierService {
  async execute({ id, userId }: GetSupplierProps) {
    const supplier = await prisma.supplier.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        products: true,
      },
    });

    if (!supplier) {
      throw new Error('Fornecedor não encontrado!');
    }

    return supplier;
  }
}

export default GetSupplierService;
