import { DirectoryFormDialog } from './directory-form-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui';
import { Directory } from '@/src/features/directories/types/directories.types';
import { DirectoryCell } from './directory-cell';
import { DirectoryOptionsMap } from '@/src/features/directories/types/directory-options-map';

type DirectoryItem = Record<string, unknown>;
interface DirectoryContentProps {
  directory: Directory;
  items: DirectoryItem[];
  directoryOptions: DirectoryOptionsMap;
}

export function DirectoryContent({ directory, items, directoryOptions }: DirectoryContentProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-0.5'>
          <h2 className='text-base font-medium'>{directory.title}</h2>
          <p className='text-sm text-muted-foreground'>{`Элементов: ${items.length}`}</p>
        </div>
        <DirectoryFormDialog directory={directory} directoryOptions={directoryOptions} />
      </div>

      <div className='rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              {directory.fields.map((field) => (
                <TableHead key={field.name}>{field.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={directory.fields.length}
                  className='h-24 text-center text-muted-foreground'
                >
                  Нет элементов
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={String(item.id)}>
                  {directory.fields.map((field) => (
                    <TableCell key={field.name}>
                      <DirectoryCell
                        value={item[field.name]}
                        field={field}
                        directoryOptions={directoryOptions}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
