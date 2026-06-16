import { prisma } from '@/src/shared/lib/prisma';
import { createStationSchema } from './station.schema';

//TODO Обернуть в try catch
export async function createStation(data: unknown) {
  console.log(data);
  const validatedData = createStationSchema.parse(data);
  return prisma.station.create({
    data: validatedData,
  });
}
