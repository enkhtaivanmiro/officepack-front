'use client';
import React from 'react';
import { Field } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';

import { cn } from '@/lib/utils';
import { cloneElement } from '@/lib/utils/react-node';

export type FormItemProps = React.PropsWithChildren<
  FieldProps & { label?: string | React.ReactNode; className?: string; hideErrors?: boolean }
>;
export function FormItem({ children, className, label, rules, hideErrors, ...rest }: FormItemProps) {
  const isRequired = !!(rules || [])?.find((r: any) => !!r.required);
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex text-sm text-8a mb-1">
          {isRequired && <span className="text-warning mr-1">*</span>}
          {label}
        </div>
      )}
      <Field validateTrigger="onBlur" rules={rules} {...rest}>
        {(childProps, meta) => (
          <>
            {/* @ts-ignore */}
            {cloneElement(children, {
              ...childProps,
              'aria-invalid': !!meta?.errors?.length,
            })}
            {!hideErrors &&
              meta?.errors?.map((error) => (
                <div className="text-sm font-medium text-warning" key={error}>
                  {error}
                </div>
              ))}
          </>
        )}
      </Field>
    </div>
  );
}
