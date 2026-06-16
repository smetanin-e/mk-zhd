import { FIELD_TYPES } from '@/src/shared/constants/form-field-types';
import { SelectOption } from '@/src/shared/interfaces/form-select.interface';
import { DirectoryModel } from './directory-models';

interface BaseField {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
}

interface TextField extends BaseField {
  type: typeof FIELD_TYPES.TEXT;
}

interface NumberField extends BaseField {
  type: typeof FIELD_TYPES.NUMBER;
}

interface BooleanField extends BaseField {
  type: typeof FIELD_TYPES.BOOLEAN;
}

interface SelectField extends BaseField {
  type: typeof FIELD_TYPES.SELECT;
  options: SelectOption[];
}

interface DirectorySelectField extends BaseField {
  type: typeof FIELD_TYPES.DIRECTORY_SELECT;
  directory: DirectoryModel;
}

export type DirectoryField =
  | TextField
  | NumberField
  | BooleanField
  | SelectField
  | DirectorySelectField;

export interface Directory {
  /** Уникальный идентификатор (значение таба) */
  id: string;
  /** Название модели в Prisma */
  model: DirectoryModel;

  /** Человекочитаемое название справочника */
  title: string;
  /** Поля формы / колонки таблицы */
  fields: DirectoryField[];

  /** Человекочитаемое значение поля */
  options?: SelectOption[];
}
