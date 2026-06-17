import { prisma } from '@/src/shared/lib/prisma';
import { createCargoOwnerSchema } from './cargo-owner.schema';

//TODO Обернуть в try catch
export async function createCargoOwner(data: unknown) {
  const validatedData = createCargoOwnerSchema.parse(data);
  return prisma.cargoOwner.create({
    data: validatedData,
  });
}
