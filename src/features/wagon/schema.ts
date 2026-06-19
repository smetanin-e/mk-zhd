import z from 'zod';
import { WagonOwnership } from '../directories/config/directories.enums';

const basedWagonSchema = z.object({
  typeId: z.uuid({ message: 'Некорректный формат идентификатора (UUID)' }),

  ownerId: z.uuid({ message: 'Некорректный формат идентификатора (UUID)' }),
  barPackage: z
    .number({ message: 'Тара с бруса должна быть числом' })
    .nonnegative({ message: 'Тара с бруса не может быть отрицательной' })
    .max(999.999, { message: 'Тара с бруса не может превышать 999.999' }),

  capacity: z
    .number({ message: 'Грузоподъемность должна быть числом' })
    .nonnegative({ message: 'Грузоподъемность не может быть отрицательной' })
    .max(999.999, { message: 'Грузоподъемность не может превышать 999.999' }),

  volume: z
    .number({ message: 'Объем должен быть числом' })
    .nonnegative({ message: 'Объем не может быть отрицательным' })
    .max(999.999, { message: 'Объем не может превышать 999.999' }),
});

export const createWagonSchema = z.discriminatedUnion('affiliationType', [
  // Схема для внутреннего вагона
  basedWagonSchema.extend({
    affiliationType: z.literal(WagonOwnership.RENTED),
    number: z
      .string()
      .trim()
      .length(8, { message: 'Номер вагона должен быть ровно 8 цифр' })
      .regex(/^\d{8}$/, { message: 'Номер вагона должен содержать только цифры' }),
  }),

  // Схема для внешнего(арендованного) вагона
  basedWagonSchema.extend({
    affiliationType: z.literal(WagonOwnership.OWN),
    number: z
      .string()
      .trim()
      .min(3, { message: 'Номер вагона должен иметь минимум 3 цифры' })
      .max(8, { message: 'Номер вагона не может быть длиннее 8 цифр' })
      .regex(/^\d+$/, { message: 'Номер вагона должен содержать только цифры' }),
  }),
]);

export const updateWagonSchema = z
  .object({
    barPackage: z
      .number({ message: 'Тара с бруса должна быть числом' })
      .nonnegative({ message: 'Тара с бруса не может быть отрицательной' })
      .max(999.999, { message: 'Тара с бруса не может превышать 999.999' })
      .optional(),

    capacity: z
      .number({ message: 'Грузоподъемность должна быть числом' })
      .nonnegative({ message: 'Грузоподъемность не может быть отрицательной' })
      .max(999.999, { message: 'Грузоподъемность не может превышать 999.999' })
      .optional(),

    volume: z
      .number({ message: 'Объем должен быть числом' })
      .nonnegative({ message: 'Объем не может быть отрицательным' })
      .max(999.999, { message: 'Объем не может превышать 999.999' })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Должно быть указано хотя бы одно поле для обновления',
  });

export type CreateWagonInput = z.infer<typeof createWagonSchema>;
export type UpdateWagonInput = z.infer<typeof updateWagonSchema>;
