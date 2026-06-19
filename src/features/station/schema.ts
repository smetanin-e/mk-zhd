import { z } from 'zod';
import { StationType } from '../directories/config/directories.enums';

export const createStationSchema = z.discriminatedUnion('type', [
  // Схема для INTERNAL станций
  z.object({
    name: z.string().trim().min(3, { message: 'Название станции обязательно' }).max(50),
    type: z.literal(StationType.INTERNAL),
    code: z
      .string()
      .nullable()
      .optional()
      .transform((v) => v?.trim() || null), // Только null или undefined
  }),

  // Схема для EXTERNAL станций
  z.object({
    name: z.string().trim().min(1, { message: 'Название станции обязательно' }).max(50),
    type: z.literal(StationType.EXTERNAL),
    code: z
      .string()
      .trim()
      .min(3, { message: 'Для внешних станций обязателен код' })
      .max(50, { message: 'Код станции не должен превышать 50 символов' }),
  }),
]);

export type CreateStationInput = z.infer<typeof createStationSchema>;
