import { createWagonTypeSchema, updateWagonTypeSchema } from './wagon-type.schema';
import { createWagonType } from './wagon-type.service';

export const WagonTypeConfig = {
  createSchema: createWagonTypeSchema,
  updateSchema: updateWagonTypeSchema,
  createAction: createWagonType,
};
