import { prisma } from '@/src/shared/lib/prisma';
import { createOperationTypeSchema } from './operation-type.schema';
import { serializePrisma } from '@/src/shared/lib/serialize-prisma';

//TODO Обернуть в try catch
export async function createOperationType(data: unknown) {
  const validatedData = createOperationTypeSchema.parse(data);
  return serializePrisma(
    await prisma.operationType.create({
      data: validatedData,
    }),
  );
}
