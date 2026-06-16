export const FIELD_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  SELECT: 'select',
  DIRECTORY_SELECT: 'directory-select',
} as const;

export type FieldType = (typeof FIELD_TYPES)[keyof typeof FIELD_TYPES];
