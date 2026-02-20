'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function Password({ className, ...props }: React.ComponentProps<'input'>) {
  const [type, setType] = useState<'password' | 'text'>('password');

  return (
    <div className={cn('w-full relative', className)}>
      <Input {...props} type={type} className="pl-4 pr-12" />
      <button
        type="button"
        className="absolute size-6 top-3 right-4 cursor-pointer text-gray-500 hover:text-black transition-colors"
        onClick={() => setType(type === 'text' ? 'password' : 'text')}
      >
        {type === 'text' ? <Eye /> : <EyeOff />}
      </button>
    </div>
  );
}

export { Password };
