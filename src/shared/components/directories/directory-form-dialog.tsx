'use client';

import { PlusIcon } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FieldGroup,
} from '../ui';

import { FieldRenderer } from '../form';
import { Directory } from '@/src/features/directories/types/directories.types';
import { createDirectoryItem } from '@/src/features/directories/actions/create-directory-item.action';

import { directoryClientRegistry } from '@/src/features/directories/registry/directory-client-registry';

import { DirectoryOptionsMap } from '@/src/features/directories/types/directory-options-map';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface DirectoryFormDialogProps {
  directory: Directory;
  directoryOptions: DirectoryOptionsMap;
}

export function DirectoryFormDialog({ directory, directoryOptions }: DirectoryFormDialogProps) {
  const schema = directoryClientRegistry[directory.model].createSchema;

  const form = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
  });

  const onSubmit = async (data: FieldValues) => {
    await createDirectoryItem(directory.model, data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>
          <PlusIcon data-icon='inline-start' />
          Добавить элемент
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Новый элемент</DialogTitle>
          <DialogDescription>
            {`Справочник «${directory.title}». Заполните поля формы.`}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            id='directory-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='overflow-y-auto'
          >
            <FieldGroup>
              {directory.fields.map((field) => (
                <FieldRenderer key={field.name} field={field} directoryOptions={directoryOptions} />
              ))}
            </FieldGroup>
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Отмена</Button>
          </DialogClose>
          <Button form='directory-form' type='submit'>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
