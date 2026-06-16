import { prisma } from '@/src/shared/lib/prisma';
import { createWagonOwnerSchema } from './wagon-owner.schema';

//TODO Обернуть в try catch
export async function createWagonOwner(data: unknown) {
  const validatedData = createWagonOwnerSchema.parse(data);
  return prisma.wagonOwner.create({
    data: validatedData,
  });
}
