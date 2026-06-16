import { FIELD_TYPES } from '@/src/shared/constants/form-field-types';
import { DirectoryField } from '@/src/features/directories/types/directories.types';
import { formatCellValue } from '@/src/features/directories/utils/format-cell-value';
import { DirectoryOptionsMap } from '@/src/features/directories/types/directory-options-map';

interface Props {
  value: unknown;
  field: DirectoryField;
  directoryOptions: DirectoryOptionsMap;
}

export function DirectoryCell({ value, field, directoryOptions }: Props) {
  if (value === null || value === undefined) {
    return <>—</>;
  }

  switch (field.type) {
    case FIELD_TYPES.SELECT: {
      const option = field.options.find((opt) => opt.value === String(value));

      return <>{option?.label ?? String(value)}</>;
    }

    case FIELD_TYPES.DIRECTORY_SELECT: {
      const options = directoryOptions?.[field.directory] ?? [];

      const option = options.find((opt) => opt.value === String(value));

      return <>{option?.label ?? String(value)}</>;
    }

    case FIELD_TYPES.BOOLEAN:
      return <>{value ? 'Да' : 'Нет'}</>;

    default:
      return <>{formatCellValue(String(value))}</>;
  }
}
