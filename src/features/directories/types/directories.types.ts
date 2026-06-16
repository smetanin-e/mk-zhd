import { FieldType } from '@/src/shared/constants/form-field-types';
import { SelectOption } from '@/src/shared/interfaces/form-select.interface';
import { DirectoryModel } from './directory-models';

export interface DirectoryField {
  /** Ключ поля (имя свойства модели) */
  name: string;
  /** Подпись поля в форме и заголовок колонки */
  label: string;
  /** Тип поля — определяет, какой контрол показать */
  type: FieldType;
  /** Подсказка/описание под полем */
  description?: string;
  /** Плейсхолдер для текстовых и числовых полей */
  placeholder?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Варианты выбора для type === "select" */
  options?: SelectOption[];
}

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
