import React from 'react';
import { SelectOption } from '@/src/shared/interfaces/form-select.interface';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Field,
  FieldDescription,
  FieldLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  description?: string;
  placeholder?: string;
  data: SelectOption[];
}
export function FormSelect({
  name,
  label,
  description,
  placeholder = 'Выберите значение',
  data,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;
  return (
    <Field>
      {label && <FieldLabel>{label}</FieldLabel>}

      <Controller
        name={name}
        control={control}
        defaultValue={''}
        render={({ field }) => (
          <Select value={field.value ?? ''} onValueChange={field.onChange}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {data.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {description && <FieldDescription>{description}</FieldDescription>}

      {errorText && <p className='-mt-2 text-[10px] text-sm text-destructive'>{errorText}</p>}
    </Field>
  );
}
