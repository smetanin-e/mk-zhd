import { prisma } from '@/src/shared/lib/prisma';
import { createWagonTypeSchema } from './wagon-type.schema';
import { revalidatePath } from 'next/cache';

//TODO Обернуть в try catch
export async function createWagonType(data: unknown) {
  const validatedData = createWagonTypeSchema.parse(data);
  const result = prisma.wagonType.create({
    data: validatedData,
  });

  revalidatePath(`/directories/wagon-type`);

  return result;
}
