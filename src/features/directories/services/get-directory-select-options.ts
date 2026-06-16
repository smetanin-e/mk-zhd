import { FIELD_TYPES } from '@/src/shared/constants/form-field-types';
import { Directory } from '../types/directories.types';
import { getDirectory } from './get-directoriy';
import { DirectoryOptionsMap } from '../types/directory-options-map';

//TODO ИСПРАВИТЬ ОШИБКУ name
export async function getDirectorySelectOptions(
  directory: Directory,
): Promise<DirectoryOptionsMap> {
  const requiredDirectories = directory.fields
    .filter((field) => field.type === FIELD_TYPES.DIRECTORY_SELECT)
    .map((field) => field.directory);

  if (requiredDirectories.length === 0) {
    return {};
  }

  return Object.fromEntries(
    await Promise.all(
      requiredDirectories.map(async (model) => {
        const items = await getDirectory(model);

        return [
          model,
          (items ?? []).map((item) => ({
            value: String(item.id),
            label: String(item.name),
          })),
        ];
      }),
    ),
  );
}
