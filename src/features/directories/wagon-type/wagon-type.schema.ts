import { z } from 'zod';

// CREATE
export const createWagonTypeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Название типа вагона обязательно' })
    .max(50, { message: 'Название типа вагона не может быть длиннее 50 символов' }),
  numberPrefix: z
    .string()
    .min(1, { message: 'Префикс обязателен' })
    .max(2, { message: 'Префикс не может быть длиннее 2 символов' })
    .regex(/^\d{1,2}$/, { message: 'Префикс должен состоять из 1–2 цифр' }),
});

// UPDATE
export const updateWagonTypeSchema = createWagonTypeSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Должно быть указано хотя бы одно поле для обновления',
  });

export type CreateWagonTypeInput = z.infer<typeof createWagonTypeSchema>;
export type UpdateWagonTypeInput = z.infer<typeof updateWagonTypeSchema>;
