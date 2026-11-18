
import prisma from '../../config/prisma';

interface CreateSupplierProps {
  name: string;
  email?: string;
  phone?: string;
  userId: number;
}

class CreateSupplierService {
  async execute({ name, email, phone, userId }: CreateSupplierProps) {
    const supplier = await prisma.supplier.create({
      data: {
        name,
        email,
        phone,
        userId,
      },
    });

    return supplier;
  }
}

export default CreateSupplierService;
