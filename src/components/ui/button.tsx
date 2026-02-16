import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center w-full gap-2 whitespace-nowrap rounded-2xl text-lg font-semibold transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-foreground text-black shadow-xs hover:bg-foreground/90',
        border: 'border-2 border-foreground',
        'border-gray': 'border-2 border-[#202020] text-white hover:border-[#ffffff66]',
        gray: 'bg-[#3D3D3D]',
        gradient: '',
        cancel: 'bg-warning text-white border-2 border-[#222]',
        danger: 'bg-destructive/10 text-destructive border-1 border-destructive',
        ghost: 'bg-transparent hover:bg-gray-100 text-black',
      },
      size: {
        '36': 'h-9 rounded-lg px-4 py-2 has-[>svg]:px-3',
        '40': 'h-10 rounded-xl px-4 py-2 has-[>svg]:px-3',
        '48': 'h-12 rounded-xl px-4 py-2 has-[>svg]:px-3',
        '52': 'h-13 px-4 py-2 has-[>svg]:px-3',
        '62': 'h-[62px] rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        icon: 'size-9 rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: '52',
    },
  },
);

const gradientVariants = cva('w-full', {
  variants: {
    size: {
      '36': 'h-9 rounded-lg px-4 py-2 has-[>svg]:px-3',
      '40': 'h-10 rounded-xl px-4 py-2 has-[>svg]:px-3',
      '48': 'h-12 rounded-xl px-4 py-2 has-[>svg]:px-3',
      '52': 'h-13 rounded-2xl px-4 py-2 has-[>svg]:px-3',
      '62': 'h-[62px] rounded-2xl gap-1.5 px-3 has-[>svg]:px-2.5',
      icon: 'size-9 rounded-sm',
    },
  },
  defaultVariants: {
    size: '52',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  borderWidth?: number;
  gradientChildClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      type = 'button',
      borderWidth = 2,
      gradientChildClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    if (variant !== 'gradient')
      return (
        <Comp
          type={type}
          data-slot="button"
          disabled={loading || props.disabled}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </Comp>
      );

    return (
      <div
        style={{ padding: borderWidth }}
        className={cn(
          'relative inline-flex overflow-hidden',
          'bg-gradient group',
          props.disabled && 'opacity-50 pointer-events-none',
          // @ts-ignore
          cn(gradientVariants({ size, className })),
        )}
      >
        <Comp
          type={type}
          {...props}
          disabled={props.disabled}
          className={cn(
            buttonVariants({
              size,
              variant: 'default',
              className: `h-full w-full bg-[#101010] disabled:bg-[#101010] disabled:opacity-100 text-white group-hover:bg-white group-hover:text-[#101010] ${gradientChildClassName || ''}`,
            }),
          )}
          ref={ref}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </Comp>
      </div>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
