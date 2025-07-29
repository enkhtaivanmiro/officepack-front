import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'w-full pt-[14px] pb-3 px-4 bg-17 border-1 border-[#3f3f3f4d] focus-visible:border-white rounded-[14px] text-base text-white placeholder:text-[#616161]',
        'aria-invalid:border-warning focus-visible:outline-0',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
