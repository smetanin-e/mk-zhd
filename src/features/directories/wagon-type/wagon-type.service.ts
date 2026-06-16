import { prisma } from '@/src/shared/lib/prisma';
import { createWagonTypeSchema } from './wagon-type.schema';

//TODO Обернуть в try catch
export async function createWagonType(data: unknown) {
  const validatedData = createWagonTypeSchema.parse(data);
  return prisma.wagonType.create({
    data: validatedData,
  });
}
