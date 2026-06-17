// Конфигурация справочников и их полей.
// Описывает интерфейс: какие справочники есть, какие колонки и поля формы.
// Здесь нет бизнес-логики — только метаданные для отрисовки UI.

import { SelectOption } from '@/src/shared/interfaces/form-select.interface';
import { Directory } from '../types/directories.types';
import { FIELD_TYPES } from '@/src/shared/constants/form-field-types';
import { OperationCategory, StationType } from './directories.enums';

const operationCategoryOptions: SelectOption[] = [
  { value: OperationCategory.PRIMARY, label: 'Основная' },
  { value: OperationCategory.SECONDARY, label: 'Второстепенная' },
];

const wagonOwnershipOptions: SelectOption[] = [
  { value: 'OWN', label: 'Собственный' },
  { value: 'RENTED', label: 'Арендованный' },
];

const stationTypeOptions: SelectOption[] = [
  { value: StationType.INTERNAL, label: 'Внутренняя' },
  { value: StationType.EXTERNAL, label: 'Внешняя' },
];

export const DIRECTORIES_CONFIG: Directory[] = [
  {
    id: 'wagons',
    model: 'Wagon',
    title: 'Вагоны',
    fields: [
      {
        name: 'number',
        label: 'Номер',
        type: 'text',
        required: true,
        placeholder: 'Например: 34123456',
      },
      {
        name: 'affiliationType',
        label: 'Принадлежность',
        type: 'select',
        required: true,
        options: wagonOwnershipOptions,
      },
      {
        name: 'typeId',
        label: 'Тип вагона',
        type: FIELD_TYPES.DIRECTORY_SELECT,
        required: true,
        directory: 'WagonType',
      },
      {
        name: 'ownerId',
        label: 'Владелец',
        required: true,
        type: FIELD_TYPES.DIRECTORY_SELECT,
        directory: 'WagonOwner',
      },
      {
        name: 'barPackage',
        label: 'Тара (т)',
        type: 'number',
        required: true,
        placeholder: '0.000',
      },
      {
        name: 'capacity',
        label: 'Грузоподъёмность (т)',
        type: 'number',
        required: true,
        placeholder: '0.000',
      },
      { name: 'volume', label: 'Объём (м³)', type: 'number', required: true, placeholder: '0.000' },
    ],
  },
  {
    id: 'operation-types',
    model: 'OperationType',
    title: 'Операции',
    fields: [
      {
        name: 'name',
        label: 'Наименование',
        type: 'text',
        required: true,
        placeholder: 'Например: Погрузка вагона',
      },
      {
        name: 'normative',
        label: 'Норматив (ч)',
        type: 'number',
        required: true,
        placeholder: '0.000',
      },
      {
        name: 'allowsParallel',
        label: 'Допускает параллельность',
        type: 'boolean',
        description: 'Разрешено существование других операций во время выполнения',
      },
      {
        name: 'category',
        label: 'Категория',
        type: 'select',
        required: true,
        options: operationCategoryOptions,
      },
    ],
  },

  {
    id: 'wagon-types',
    model: 'WagonType',
    title: 'Типы вагонов',
    fields: [
      {
        name: 'name',
        label: 'Наименование',
        type: 'text',
        required: true,
        placeholder: 'Например: Полувагон',
      },
    ],
  },
  {
    id: 'wagon-owners',
    model: 'WagonOwner',
    title: 'Владельцы вагонов',
    fields: [
      {
        name: 'name',
        label: 'Наименование',
        type: 'text',
        required: true,
        placeholder: 'Например: РЖД',
      },
    ],
  },
  {
    id: 'cargo-owners',
    model: 'CargoOwner',
    title: 'Владельцы груза',
    fields: [
      {
        name: 'name',
        label: 'Наименование',
        type: 'text',
        required: true,
        placeholder: 'Например: Северсталь',
      },
    ],
  },
  {
    id: 'cargos',
    model: 'Cargo',
    title: 'Грузы',
    fields: [
      {
        name: 'name',
        label: 'Наименование',
        type: 'text',
        required: true,
        placeholder: 'Например: Уголь каменный',
      },
      {
        name: 'nationalCode',
        label: 'ГНГ',
        type: 'text',
        required: true,
        placeholder: 'Национальный код',
      },
      {
        name: 'internationalCode',
        label: 'ЕГСНГ',
        type: 'text',
        required: true,
        placeholder: 'Международный код',
      },
    ],
  },
  {
    id: 'stations',
    model: 'Station',
    title: 'Станции',
    fields: [
      {
        name: 'type',
        label: 'Тип станции',
        type: 'select',
        required: true,
        options: stationTypeOptions,
      },
      {
        name: 'name',
        label: 'Наименование',
        type: 'text',
        required: true,
        placeholder: 'Например: Москва-Сортировочная',
      },
      { name: 'code', label: 'Код', type: 'text', placeholder: 'Например: 195006' },
    ],
  },
];
