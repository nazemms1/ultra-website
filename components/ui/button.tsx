import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        cyber: 'bg-[#0DF1D9] text-[#060E10] font-semibold tracking-wider hover:shadow-[0_0_25px_rgba(13,241,217,0.6)] hover:bg-[#0CE0CB] active:scale-[0.98] transition-all uppercase rounded-full',
        cyberOutline: 'border border-[#0DF1D9]/40 bg-transparent text-white font-semibold tracking-wider hover:border-[#0DF1D9] hover:text-[#0DF1D9] hover:shadow-[0_0_15px_rgba(13,241,217,0.25)] active:scale-[0.98] transition-all uppercase rounded-full',
        cyberGhost: 'text-white hover:bg-[#0DF1D9]/10 hover:text-[#0DF1D9] transition-all uppercase rounded-full',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 rounded-full px-4',
        lg: 'h-12 rounded-full px-8 text-base',
        pill: 'h-11 rounded-full px-8 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
