import { prisma } from '@/src/shared/lib/prisma';
import { CreateWagonOwnerInput, createWagonOwnerSchema } from './wagon-owner.schema';
import { throwActionError } from '@/src/shared/lib/errors/actions-error-handler';
import { logger } from '@/src/shared/lib/logger';

export async function createWagonOwner(data: CreateWagonOwnerInput) {
  try {
    const validatedData = createWagonOwnerSchema.parse(data);
    return await prisma.wagonOwner.create({
      data: validatedData,
    });
  } catch (error) {
    logger.error('[CREATE_WAGON_OWNER]', error);
    throwActionError(error);
  }
}
