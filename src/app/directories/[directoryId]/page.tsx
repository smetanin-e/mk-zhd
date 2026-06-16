import { DIRECTORIES_CONFIG } from '@/src/features/directories/config/directories.config';
import { getDirectory } from '@/src/features/directories/services/get-directoriy';
import { getDirectorySelectOptions } from '@/src/features/directories/services/get-directory-select-options';
import { DirectoryContent } from '@/src/shared/components/directories/directory-content';

interface Props {
  params: Promise<{
    directoryId: string;
  }>;
}

export default async function DirectoryPage({ params }: Props) {
  const { directoryId } = await params;

  const directory = DIRECTORIES_CONFIG.find((d) => d.id === directoryId);

  if (!directory) return null;

  const items = await getDirectory(directory.model);
  if (!items) return null;

  const directoryOptions = await getDirectorySelectOptions(directory);

  return (
    <DirectoryContent directory={directory} items={items} directoryOptions={directoryOptions} />
  );
}
