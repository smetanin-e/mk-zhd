import { Directory } from '@/src/shared/lib/directories';
import { DirectoryFormDialog } from './directory-form-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui';

interface DirectoryContentProps {
  directory: Directory;
}

function formatCell(value: string | number | boolean | undefined) {
  if (typeof value === 'boolean') {
    return value ? 'Да' : 'Нет';
  }
  if (value === undefined || value === '') {
    return '—';
  }
  return String(value);
}

export function DirectoryContent({ directory }: DirectoryContentProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-0.5'>
          <h2 className='text-base font-medium'>{directory.title}</h2>
          <p className='text-sm text-muted-foreground'>{`Элементов: ${directory.items.length}`}</p>
        </div>
        <DirectoryFormDialog directory={directory} />
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
            {directory.items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={directory.fields.length}
                  className='h-24 text-center text-muted-foreground'
                >
                  Нет элементов
                </TableCell>
              </TableRow>
            ) : (
              directory.items.map((item, index) => (
                <TableRow key={index}>
                  {directory.fields.map((field) => (
                    <TableCell key={field.name}>{formatCell(item[field.name])}</TableCell>
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
