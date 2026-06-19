import { prisma } from '@/src/shared/lib/prisma';
import { CreateWagonInput, createWagonSchema } from './wagon.schema';
import { serializePrisma } from '@/src/shared/lib/serialize-prisma';
import { throwActionError } from '@/src/shared/lib/errors/actions-error-handler';
import { logger } from '@/src/shared/lib/logger';

export async function createWagon(data: CreateWagonInput) {
  try {
    const validatedData = createWagonSchema.parse(data);

    return serializePrisma(
      await prisma.wagon.create({
        data: validatedData,
      }),
    );
  } catch (error) {
    logger.error('[CREATE_WAGON]', error);
    throwActionError(error);
  }
}
