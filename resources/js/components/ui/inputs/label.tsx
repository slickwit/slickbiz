import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

// ----------------------------------------------------------------------

const labelVariant = cva(
    'h-6 min-w-6 cursor-default select-none rounded-md inline-flex items-center justify-center text-xs leading-[0] font-bold transition-all px-1.5 capitalize',
    {
        variants: {
            variant: {
                contained: '',
                outlined: '',
                ghost: '',
            },
            color: {
                default: '',
                primary: '',
                secondary: '',
                info: '',
                success: '',
                warning: '',
                error: '',
            },
        },
        compoundVariants: [
            // Default
            {
                variant: 'contained',
                color: 'default',
                className: 'text-white bg-common dark:text-slate-900',
            },
            {
                variant: 'outlined',
                color: 'default',
                className: 'text-common bg-transparent border-2 border-common dark:border-white dark:text-white',
            },
            {
                variant: 'ghost',
                color: 'default',
                className: 'text-foreground bg-accent/[0.8] dark:bg-accent/10',
            },
            // Primary
            {
                variant: 'contained',
                color: 'primary',
                className: 'text-white bg-primary',
            },
            {
                variant: 'outlined',
                color: 'primary',
                className: 'text-primary bg-transparent border-2 border-primary',
            },
            {
                variant: 'ghost',
                color: 'primary',
                className: 'text-primary bg-primary/[0.16]',
            },
            // Secondary
            {
                variant: 'contained',
                color: 'secondary',
                className: 'text-white bg-secondary',
            },
            {
                variant: 'outlined',
                color: 'secondary',
                className: 'text-secondary bg-transparent border-2 border-secondary',
            },
            {
                variant: 'ghost',
                color: 'secondary',
                className: 'text-secondary bg-secondary/[0.16]',
            },
            // Info
            {
                variant: 'contained',
                color: 'info',
                className: 'text-white bg-info',
            },
            {
                variant: 'outlined',
                color: 'info',
                className: 'text-info bg-transparent border-2 border-info',
            },
            {
                variant: 'ghost',
                color: 'info',
                className: 'text-info bg-info/[0.16]',
            },
            // Success
            {
                variant: 'contained',
                color: 'success',
                className: 'text-white bg-success',
            },
            {
                variant: 'outlined',
                color: 'success',
                className: 'text-success bg-transparent border-2 border-success',
            },
            {
                variant: 'ghost',
                color: 'success',
                className: 'text-success bg-success/[0.16]',
            },
            // Warning
            {
                variant: 'contained',
                color: 'warning',
                className: 'text-[#212b36] bg-warning',
            },
            {
                variant: 'outlined',
                color: 'warning',
                className: 'text-warning bg-transparent border-2 border-warning',
            },
            {
                variant: 'ghost',
                color: 'warning',
                className: 'text-warning-dark bg-warning/[0.16]',
            },
            // Error
            {
                variant: 'contained',
                color: 'error',
                className: 'text-white bg-error',
            },
            {
                variant: 'outlined',
                color: 'error',
                className: 'text-error bg-transparent border-2 border-error',
            },
            {
                variant: 'ghost',
                color: 'error',
                className: 'text-error bg-error/[0.16]',
            },
        ],
        defaultVariants: {
            variant: 'contained',
            color: 'default',
        },
    },
);

interface LabelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof labelVariant> {}

export default function Label({ children, className, variant, color }: LabelProps) {
    return <div className={cn(labelVariant({ variant, color, className }))}>{children}</div>;
}
