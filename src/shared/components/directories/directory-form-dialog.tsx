'use client';

import { useForm, Controller } from 'react-hook-form';
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
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '../ui';
import { Directory } from '../../lib/directories';

interface DirectoryFormDialogProps {
  directory: Directory;
}

export function DirectoryFormDialog({ directory }: DirectoryFormDialogProps) {
  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
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

        <form id='directory-form' onSubmit={handleSubmit(onSubmit)} className='overflow-y-auto'>
          <FieldGroup>
            {directory.fields.map((field) => {
              const fieldId = `${directory.id}-${field.name}`;

              if (field.type === 'boolean') {
                return (
                  <Field key={field.name} orientation='horizontal'>
                    <Controller
                      name={field.name}
                      control={control}
                      defaultValue={false}
                      render={({ field: controllerField }) => (
                        <Switch
                          id={fieldId}
                          checked={controllerField.value}
                          onCheckedChange={controllerField.onChange}
                        />
                      )}
                    />
                    <FieldLabel htmlFor={fieldId}>{field.label}</FieldLabel>
                    {field.description ? (
                      <FieldDescription>{field.description}</FieldDescription>
                    ) : null}
                  </Field>
                );
              }

              if (field.type === 'select') {
                return (
                  <Field key={field.name}>
                    <FieldLabel htmlFor={fieldId}>{field.label}</FieldLabel>
                    <Controller
                      name={field.name}
                      control={control}
                      render={({ field: controllerField }) => (
                        <Select
                          value={controllerField.value}
                          onValueChange={controllerField.onChange}
                        >
                          <SelectTrigger id={fieldId} className='w-full'>
                            <SelectValue placeholder='Выберите значение' />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              {field.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {field.description ? (
                      <FieldDescription>{field.description}</FieldDescription>
                    ) : null}
                  </Field>
                );
              }

              return (
                <Field key={field.name}>
                  <FieldLabel htmlFor={fieldId}>{field.label}</FieldLabel>
                  <Input
                    id={fieldId}
                    type={field.type === 'number' ? 'number' : 'text'}
                    step={field.type === 'number' ? 'any' : undefined}
                    placeholder={field.placeholder}
                    {...register(field.name)}
                  />
                  {field.description ? (
                    <FieldDescription>{field.description}</FieldDescription>
                  ) : null}
                </Field>
              );
            })}
          </FieldGroup>
        </form>

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
