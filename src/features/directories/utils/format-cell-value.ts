export const formatCellValue = (value: string | number | boolean | undefined) => {
  if (typeof value === 'boolean') return value ? 'Да' : 'Нет';
  if (value === undefined || value === '') return '—';
  return String(value);
};
