'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

function Checkbox({
  value,
  onChange,
  className,
  children,
  rootClassName,
}: React.PropsWithChildren<{
  value?: string;
  className?: string;
  rootClassName?: string;
  onChange?: (val: boolean) => void;
}>) {
  return (
    <div className={cn('flex gap-2 items-center cursor-pointer', rootClassName)} onClick={() => onChange?.(!value)}>
      <input checked={!!value} type="checkbox" className="hidden" />
      <span
        className={cn('size-6 rounded border-1 border-white flex items-center justify-center', className, {
          ['bg-white']: !!value,
        })}
      >
        <Check
          className={cn('text-[#101010] size-5 transition-all duration-200 ease-in-out scale-0', { ['scale-100']: !!value })}
        />
      </span>
      {children}
    </div>
  );
}

export { Checkbox };
