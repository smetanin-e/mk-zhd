import { prisma } from '@/src/shared/lib/prisma';
import { createOperationTypeSchema } from './operation-type.schema';
import { serializePrisma } from '@/src/shared/lib/serialize-prisma';
import { revalidatePath } from 'next/cache';

//TODO Обернуть в try catch
export async function createOperationType(data: unknown) {
  const validatedData = createOperationTypeSchema.parse(data);

  const result = await prisma.operationType.create({
    data: validatedData,
  });

  revalidatePath(`/directories/operation-types`);

  return serializePrisma(result);
}
