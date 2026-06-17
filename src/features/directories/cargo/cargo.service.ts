import { prisma } from '@/src/shared/lib/prisma';
import { createCargoSchema } from './cargo.schema';

//TODO Обернуть в try catch
export async function createCargo(data: unknown) {
  const validatedData = createCargoSchema.parse(data);
  return prisma.cargo.create({
    data: validatedData,
  });
}
