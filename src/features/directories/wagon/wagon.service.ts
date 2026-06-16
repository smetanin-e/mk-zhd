import { prisma } from '@/src/shared/lib/prisma';
import { createWagonSchema } from './wagon.schema';
import { serializePrisma } from '@/src/shared/lib/serialize-prisma';

//TODO Обернуть в try catch
export async function createWagon(data: unknown) {
  const validatedData = createWagonSchema.parse(data);

  return serializePrisma(
    await prisma.wagon.create({
      data: validatedData,
    }),
  );
}
