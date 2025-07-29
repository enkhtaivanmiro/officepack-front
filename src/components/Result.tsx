import React from 'react';

import empty from '@/assets/images/empty-state.png';
import { cn } from '@/lib/utils';
export interface ResultProps {
  image?: string;
  title: string;
  className?: string;
  action?: React.ReactNode;
}

export function Result({ image, title, action, className }: ResultProps) {
  return (
    <div className={cn('pt-20 flex gap-6 min-h-[calc(100svh-80px)] flex-col items-center justify-center', className)}>
      <img src={image || empty.src} alt="portal empty" />
      <div className="text-[#6E6E6E] text-center font-medium">{title}</div>
      {action}
    </div>
  );
}
