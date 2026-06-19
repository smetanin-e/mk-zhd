'use server';
import { prisma } from '@/src/shared/lib/prisma';
import { CreateWagonTypeInput, createWagonTypeSchema } from './wagon-type.schema';
import { revalidatePath } from 'next/cache';
import { logger } from '@/src/shared/lib/logger';
import { throwActionError } from '@/src/shared/lib/errors/actions-error-handler';

export async function createWagonType(data: CreateWagonTypeInput) {
  try {
    const validatedData = createWagonTypeSchema.parse(data);

    const result = await prisma.wagonType.create({
      data: validatedData,
    });

    revalidatePath(`/directories/wagon-type`);

    return result;
  } catch (error) {
    logger.error('[CREATE_WAGON_TYPE]', error);
    throwActionError(error);
  }
}
