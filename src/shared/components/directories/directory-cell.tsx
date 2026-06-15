import { DirectoryField } from '@/src/features/directories/types/directories.types';
import { formatCellValue } from '@/src/features/directories/utils/format-cell-value';

interface Props {
  value: unknown;
  field: DirectoryField;
}

export function DirectoryCell({ value, field }: Props) {
  if (field.options) {
    const option = field.options.find((opt) => opt.value === value);

    return <>{option?.label ?? value ?? '—'}</>;
  }

  if (field.type === 'boolean') {
    return <>{value ? 'Да' : 'Нет'}</>;
  }

  return <>{formatCellValue(String(value))}</>;
}
