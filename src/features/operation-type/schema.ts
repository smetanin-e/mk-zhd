import z from 'zod';
import { OperationCategory } from '../directories/config/directories.enums';

export const createOperationTypeSchema = z.object({
  name: z.string().trim().min(3, { message: 'Название станции обязательно' }).max(50),
  normative: z
    .number({ message: 'Норма должна быть числом' })
    .nonnegative({ message: 'Норма не может быть отрицательной' })
    .max(99.99, { message: 'Норма не может превышать 99.99' }),
  category: z.enum(OperationCategory, {
    message: 'Категория операции может быть только "PRIMARY" | "SECONDARY"',
  }),
  allowsParallel: z.boolean(),
});

export type CreateOperationTypeInput = z.infer<typeof createOperationTypeSchema>;
