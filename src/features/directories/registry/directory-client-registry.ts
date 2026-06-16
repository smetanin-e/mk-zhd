import { ZodType } from 'zod';
import { DirectoryModel } from '../types/directory-models';
import { createWagonTypeSchema, updateWagonTypeSchema } from '../wagon-type/wagon-type.schema';

export const directoryClientRegistry = {
  WagonType: {
    createSchema: createWagonTypeSchema,
    updateSchema: updateWagonTypeSchema,
  },
} satisfies Partial<Record<DirectoryModel, { createSchema: ZodType; updateSchema: ZodType }>>;
