import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const checkboxVariants = cva(
    'group peer size-[1.25rem] shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground dark:aria-invalid:ring-destructive/40',
    {
        variants: {
            variant: {
                default:
                    'border-common data-[state=checked]:bg-common data-[state=checked]:border-common data-[state=indeterminate]:bg-common data-[state=indeterminate]:border-common',
                primary:
                    'data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=checked]:border-primary',
                secondary:
                    'data-[state=checked]:bg-secondary data-[state=indeterminate]:bg-secondary data-[state=indeterminate]:border-secondary data-[state=checked]:border-secondary',
                info: 'data-[state=checked]:bg-info data-[state=indeterminate]:bg-info data-[state=indeterminate]:border-info data-[state=checked]:border-info data-[state=checked]:text-white data-[state=indeterminate]:text-white',
                success:
                    'data-[state=checked]:bg-success data-[state=indeterminate]:bg-success data-[state=indeterminate]:border-success data-[state=checked]:border-success',
                warning:
                    'data-[state=checked]:bg-warning data-[state=indeterminate]:bg-warning data-[state=indeterminate]:border-warning data-[state=checked]:border-warning',
                error: 'data-[state=checked]:bg-error data-[state=indeterminate]:bg-error data-[state=indeterminate]:border-error data-[state=checked]:border-error',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

interface ICheckbox extends React.ComponentProps<typeof CheckboxPrimitive.Root>, VariantProps<typeof checkboxVariants> {
    indeterminate?: boolean;
    variant?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, ICheckbox>(
    ({ className, variant = 'default', ...props }, ref) => (
        <CheckboxPrimitive.Root ref={ref} data-slot="checkbox" className={cn(checkboxVariants({ variant, className }))} {...props}>
            <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current transition-none">
                <CheckIcon className="hidden size-3 stroke-[4] group-data-[state=checked]:block" />
                <MinusIcon className="hidden size-3 stroke-[4] group-data-[state=indeterminate]:block" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox };
