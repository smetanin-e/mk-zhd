import { prisma } from '@/src/shared/lib/prisma';
import { CreateOperationTypeInput, createOperationTypeSchema } from './operation-type.schema';
import { serializePrisma } from '@/src/shared/lib/serialize-prisma';
import { revalidatePath } from 'next/cache';
import { throwActionError } from '@/src/shared/lib/errors/actions-error-handler';
import { logger } from '@/src/shared/lib/logger';

export async function createOperationType(data: CreateOperationTypeInput) {
  try {
    const validatedData = createOperationTypeSchema.parse(data);

    const result = await prisma.operationType.create({
      data: validatedData,
    });

    revalidatePath(`/directories/operation-types`);

    return serializePrisma(result);
  } catch (error) {
    logger.error('[CREATE_OPERATION_TYPE]', error);
    throwActionError(error);
  }
}
