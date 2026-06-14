// Конфигурация справочников и их полей.
// Описывает интерфейс: какие справочники есть, какие колонки и поля формы.
// Здесь нет бизнес-логики — только метаданные для отрисовки UI.

export type FieldType = 'text' | 'number' | 'boolean' | 'select';

export interface SelectOption {
  value: string;
  label: string;
}

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
  model: string;
  /** Человекочитаемое название справочника */
  title: string;
  /** Поля формы / колонки таблицы */
  fields: DirectoryField[];
  /** Примеры элементов для отображения списка */
  items: Record<string, string | number | boolean>[];
}

const operationCategoryOptions: SelectOption[] = [
  { value: 'LOADING', label: 'Погрузка' },
  { value: 'UNLOADING', label: 'Выгрузка' },
  { value: 'MOVEMENT', label: 'Перемещение' },
  { value: 'SERVICE', label: 'Обслуживание' },
];

const wagonOwnershipOptions: SelectOption[] = [
  { value: 'OWN', label: 'Собственный' },
  { value: 'RENTED', label: 'Арендованный' },
  { value: 'FOREIGN', label: 'Чужой' },
];

const stationTypeOptions: SelectOption[] = [
  { value: 'DEPARTURE', label: 'Отправления' },
  { value: 'DESTINATION', label: 'Назначения' },
  { value: 'TRANSIT', label: 'Транзитная' },
];

export const directories: Directory[] = [
  {
    id: 'operation-types',
    model: 'OperationType',
    title: 'Типы операций',
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
        label: 'Параллельное выполнение',
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
    items: [
      { name: 'Погрузка вагона', normative: '2.500', allowsParallel: false, category: 'Погрузка' },
      { name: 'Выгрузка вагона', normative: '1.750', allowsParallel: false, category: 'Выгрузка' },
      {
        name: 'Маневровые работы',
        normative: '0.500',
        allowsParallel: true,
        category: 'Перемещение',
      },
    ],
  },
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
        name: 'type',
        label: 'Тип вагона',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: 'Полувагон' },
          { value: '2', label: 'Цистерна' },
          { value: '3', label: 'Платформа' },
        ],
      },
      {
        name: 'owner',
        label: 'Владелец',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: 'РЖД' },
          { value: '2', label: 'ПГК' },
          { value: '3', label: 'ФГК' },
        ],
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
    items: [
      {
        number: '34123456',
        affiliationType: 'Собственный',
        type: 'Полувагон',
        owner: 'РЖД',
        barPackage: '22.500',
        capacity: '69.000',
        volume: '88.000',
      },
      {
        number: '51987654',
        affiliationType: 'Арендованный',
        type: 'Цистерна',
        owner: 'ПГК',
        barPackage: '24.000',
        capacity: '66.000',
        volume: '73.100',
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
      {
        name: 'numberPrefix',
        label: 'Префикс номера',
        type: 'text',
        required: true,
        description: 'Префикс, с которого должен начинаться номер вагона',
        placeholder: 'Например: 3',
      },
    ],
    items: [
      { name: 'Полувагон', numberPrefix: '6' },
      { name: 'Цистерна', numberPrefix: '7' },
      { name: 'Платформа', numberPrefix: '4' },
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
    items: [{ name: 'РЖД' }, { name: 'ПГК' }, { name: 'ФГК' }],
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
    items: [{ name: 'Северсталь' }, { name: 'Норникель' }, { name: 'Уралкалий' }],
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
    items: [
      { name: 'Уголь каменный', nationalCode: '27011100', internationalCode: '161015' },
      { name: 'Руда железная', nationalCode: '26011100', internationalCode: '141011' },
    ],
  },
  {
    id: 'stations',
    model: 'Station',
    title: 'Станции',
    fields: [
      {
        name: 'name',
        label: 'Наименование',
        type: 'text',
        required: true,
        placeholder: 'Например: Москва-Сортировочная',
      },
      { name: 'code', label: 'Код', type: 'text', placeholder: 'Например: 195006' },
      { name: 'type', label: 'Тип', type: 'select', required: true, options: stationTypeOptions },
    ],
    items: [
      { name: 'Москва-Сортировочная', code: '195006', type: 'Отправления' },
      { name: 'Новороссийск', code: '513008', type: 'Назначения' },
    ],
  },
];
