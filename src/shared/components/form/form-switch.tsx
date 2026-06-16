'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldDescription, FieldLabel, Switch } from '../ui';

interface Props {
  name: string;
  label?: string;
  description?: string;
}

export function FormSwitch({ name, label, description }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string | undefined;

  return (
    <Field orientation='horizontal'>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <Switch id={name} checked={field.value} onCheckedChange={field.onChange} />
        )}
      />

      <div className='flex flex-col'>
        {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

        {description && <FieldDescription>{description}</FieldDescription>}

        {errorText && <p className='-mt-2 text-[10px] text-sm text-destructive'>{errorText}</p>}
      </div>
    </Field>
  );
}
