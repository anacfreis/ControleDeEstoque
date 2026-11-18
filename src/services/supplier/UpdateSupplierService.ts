
import prisma from '../../config/prisma';

interface UpdateSupplierProps {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  userId: number;
}

class UpdateSupplierService {
  async execute({ id, name, email, phone, userId }: UpdateSupplierProps) {
    const supplier = await prisma.supplier.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!supplier) {
      throw new Error('Fornecedor não encontrado!');
    }

    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: {
        name,
        email,
        phone,
      },
    });

    return updatedSupplier;
  }
}

export default UpdateSupplierService;
