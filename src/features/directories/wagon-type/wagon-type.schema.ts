import { z } from 'zod';

// CREATE
export const createWagonTypeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Название типа вагона обязательно' })
    .max(50, { message: 'Название типа вагона не может быть длиннее 50 символов' }),
});

export type CreateWagonTypeInput = z.infer<typeof createWagonTypeSchema>;
