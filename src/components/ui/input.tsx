import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full pt-[14px] pb-3 px-4 bg-white border border-gray-200 focus-visible:border-black rounded-[14px] text-base text-black placeholder:text-gray-500',
        'aria-invalid:border-red-500 focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
