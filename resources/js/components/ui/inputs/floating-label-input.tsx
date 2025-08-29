import { cn } from '@/lib/utils';
import * as React from 'react';
import { type FloatingInputProps, FloatingInput } from './base/floating-input';
import { FloatingLabel } from './base/floating-label';

type FloatingLabelInputProps = FloatingInputProps & {
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    label?: string;
    error?: boolean;
    startIcon?: React.ReactNode;
};

const FloatingLabelInput = React.forwardRef<React.ElementRef<typeof FloatingInput>, React.PropsWithoutRef<FloatingLabelInputProps>>(
    ({ id, label, error = false, className, containerProps, startIcon, ...props }, ref) => {
        return (
            <div
                {...containerProps}
                className={cn(
                    'relative',
                    error && '[&>*]:text-error [&>fieldset]:border-error [&>fieldset]:dark:border-error',
                    containerProps?.className,
                )}
            >
                {startIcon && <span className="absolute top-1/2 left-2 size-5 -translate-y-1/2 text-input">{startIcon}</span>}
                <FloatingInput
                    ref={ref}
                    id={id}
                    className={cn(className, 'focus-visible:ring-opacity-0 px-3 focus-visible:ring-0 focus-visible:ring-ring', {
                        'text-error': error,
                        'px-8': !!startIcon,
                    })}
                    {...props}
                />
                <FloatingLabel
                    htmlFor={id}
                    size={props.size}
                    className={cn('font-medium peer-focus:text-primary', {
                        'text-error peer-focus:text-error': error,
                        'peer-:!left-[13px] !left-9 peer-not-placeholder-shown:!left-[13px] peer-focus:!left-[13px]': !!startIcon,
                    })}
                >
                    {label}
                </FloatingLabel>
                <fieldset
                    className={cn(
                        'pointer-events-none absolute inset-0 -top-[5px] m-0 min-w-0 rounded-md border border-input px-2 py-0 text-left transition-all peer-focus-visible:border-2 peer-focus-visible:border-primary dark:border-input/35 peer-placeholder-shown:[&>legend]:max-w-0 peer-focus:[&>legend]:max-w-full peer-focus-visible:[&>legend]:max-w-full',
                    )}
                >
                    <legend className="invisible h-3 w-auto max-w-full overflow-hidden p-0 text-xs leading-4 font-normal whitespace-nowrap transition-all">
                        <span className="visible inline-block px-1 opacity-0">{label}</span>
                    </legend>
                </fieldset>
            </div>
        );
    },
);
FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingLabelInput };
