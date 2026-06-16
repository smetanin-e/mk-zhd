'use client';
import { useFormContext } from 'react-hook-form';

import { Field, FieldDescription, FieldLabel, Input } from '../ui';

interface Props {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: 'text' | 'number';
}

export function FormInput({ name, label, description, placeholder, type = 'text' }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string | undefined;

  return (
    <Field>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        step={type === 'number' ? 'any' : undefined}
        {...register(name)}
      />

      {errorText && <p className='-mt-2 text-[10px] text-destructive'>{errorText}</p>}
    </Field>
  );
}
