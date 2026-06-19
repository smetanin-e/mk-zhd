import { prisma } from '@/src/shared/lib/prisma';
import { CreateCargoInput, createCargoSchema } from './cargo.schema';
import { logger } from '@/src/shared/lib/logger';
import { throwActionError } from '@/src/shared/lib/errors/actions-error-handler';

export async function createCargo(data: CreateCargoInput) {
  try {
    const validatedData = createCargoSchema.parse(data);
    return await prisma.cargo.create({
      data: validatedData,
    });
  } catch (error) {
    logger.error('[CREATE_CARGO]', error);
    throwActionError(error);
  }
}
