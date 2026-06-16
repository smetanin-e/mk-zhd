import { createWagonTypeSchema, updateWagonTypeSchema } from './wagon-type.schema';

export const WagonTypeClientConfig = {
  createSchema: createWagonTypeSchema,
  updateSchema: updateWagonTypeSchema,
};
