import { FIELD_TYPES } from '@/src/shared/constants/form-field-types';
import { FormInput, FormSelect, FormSwitch } from './index';
import { DirectoryField } from '@/src/features/directories/types/directories.types';
import { DirectoryOptionsMap } from '@/src/features/directories/types/directory-options-map';

interface Props {
  field: DirectoryField;
  directoryOptions: DirectoryOptionsMap;
}

export function FieldRenderer({ field, directoryOptions }: Props) {
  switch (field.type) {
    case FIELD_TYPES.TEXT:
    case FIELD_TYPES.NUMBER:
      return (
        <FormInput
          name={field.name}
          label={field.label}
          description={field.description}
          placeholder={field.placeholder}
          type={field.type}
        />
      );

    case FIELD_TYPES.SELECT:
      return (
        <FormSelect
          name={field.name}
          label={field.label}
          description={field.description}
          data={field.options ?? []}
        />
      );

    case FIELD_TYPES.DIRECTORY_SELECT:
      return (
        <FormSelect
          name={field.name}
          label={field.label}
          description={field.description}
          data={directoryOptions[field.directory] ?? []}
        />
      );

    case FIELD_TYPES.BOOLEAN:
      return <FormSwitch name={field.name} label={field.label} description={field.description} />;

    default:
      return null;
  }
}
