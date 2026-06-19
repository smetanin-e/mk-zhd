import { prisma } from '@/src/shared/lib/prisma';
import { CreateStationInput, createStationSchema } from './schema';
import { throwActionError } from '@/src/shared/lib/errors/actions-error-handler';
import { logger } from '@/src/shared/lib/logger';

export async function createStation(data: CreateStationInput) {
  try {
    const validatedData = createStationSchema.parse(data);
    return await prisma.station.create({
      data: validatedData,
    });
  } catch (error) {
    logger.error('[CREATE_STATION]', error);
    throwActionError(error);
  }
}
