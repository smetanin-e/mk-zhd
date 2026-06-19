import { prisma } from '@/src/shared/lib/prisma';
import { CreateCargoOwnerInput, createCargoOwnerSchema } from './schema';
import { logger } from '@/src/shared/lib/logger';
import { throwActionError } from '@/src/shared/lib/errors/actions-error-handler';

export async function createCargoOwner(data: CreateCargoOwnerInput) {
  try {
    const validatedData = createCargoOwnerSchema.parse(data);
    return await prisma.cargoOwner.create({
      data: validatedData,
    });
  } catch (error) {
    logger.error('[CREATE_CARGO_OWNER]', error);
    throwActionError(error);
  }
}
