import { FloatingLabelButon } from '@/components/ui/buttons/floating-label-button';
import { cn } from '@/lib/utils';
import type { TClassName } from '@/types';
import { ChevronsUpDown, Square, SquareCheckBig } from 'lucide-react';
import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

// ----------------------------------------------------------------------

type SelectOption = {
    label: string;
    value: string;
};

interface FloatingLabelButonProps {
    asChild?: boolean;
    ring?: boolean;
    color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
    size?: 'default' | 'sm' | 'md' | 'lg' | 'icon';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    error?: boolean;
    className: TClassName;
}

interface FloatingMultiSelectProps {
    value: string[];
    label: string;
    options: SelectOption[];
    error?: { message: string };
    helperText?: string;
    containerClass?: TClassName;
    btnProps?: FloatingLabelButonProps;
    popoverProps?: React.ComponentProps<typeof PopoverContent>;
    onChange?: (values: string[]) => void;
}

const FloatingMultiSelect = ({
    label,
    value = [],
    error,
    options,
    onChange,
    helperText,
    containerClass,
    btnProps,
    popoverProps,
}: FloatingMultiSelectProps) => {
    const btnRef = React.useRef<React.ComponentRef<'button'>>(null);
    const [popupWidth, setPopupWidth] = React.useState({});
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (btnRef.current) {
            setPopupWidth({ width: btnRef.current.clientWidth });
        }
    }, []);

    // Get selected labels for display
    const getSelectedLabels = () => {
        return value
            .map((val) => options.find((opt) => opt.value === val)?.label)
            .filter(Boolean)
            .join(', ');
    };

    const handleValueChange = (inputValue: string) => {
        const newValues = value.includes(inputValue)
            ? value.filter((val) => val !== inputValue) // Remove if already selected
            : [...value, inputValue]; // Add if not selected

        onChange?.(newValues);
    };

    const handleToggleAll = () => {
        const allValues = options.map((opt) => opt.value);
        const newValues = value.length === allValues.length ? [] : allValues;
        onChange?.(newValues);
    };

    return (
        <div className={containerClass}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <FloatingLabelButon
                        aria-expanded={open}
                        {...btnProps}
                        ref={btnRef}
                        label={label}
                        value={getSelectedLabels() || ''} // Space to maintain floating label position
                        endIcon={<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
                        error={!!error}
                    />
                </PopoverTrigger>
                <PopoverContent
                    {...popoverProps}
                    style={popupWidth}
                    className={cn('w-full min-w-[--radix-popper-anchor-width] space-y-0 p-0', popoverProps?.className)}
                >
                    {/* Select All option */}
                    <div
                        onClick={handleToggleAll}
                        className={cn('flex cursor-pointer items-center rounded-md px-1.5 py-2 select-none hover:bg-accent dark:hover:bg-accent/10', {
                            'bg-accent font-medium dark:bg-accent/10': value.length === options.length,
                        })}
                    >
                        {value.length === options.length ? <SquareCheckBig className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                        <span className="ml-2 text-sm whitespace-nowrap">{value.length === options.length ? 'Deselect All' : 'Select All'}</span>
                    </div>

                    {options.map((option) => {
                        const selected = value.includes(option.value);
                        return (
                            <div
                                key={option.value}
                                onClick={() => handleValueChange(option.value)}
                                className={cn(
                                    'flex cursor-pointer items-center rounded-md px-1.5 py-2 select-none hover:bg-accent dark:hover:bg-accent/10',
                                    {
                                        'bg-accent font-medium dark:bg-accent/10': selected,
                                    },
                                )}
                            >
                                {selected ? <SquareCheckBig className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                                <span className="ml-2 text-sm whitespace-nowrap">{option.label}</span>
                            </div>
                        );
                    })}
                </PopoverContent>
            </Popover>
            {(!!error || !!helperText) && (
                <div className="mt-2 space-y-2">
                    {!!helperText && <p className="ml-1.5 text-sm text-muted-foreground">{helperText}</p>}
                    {!!error && <p className="ml-1.5 text-sm text-error">{error?.message}</p>}
                </div>
            )}
        </div>
    );
};

FloatingMultiSelect.displayName = 'FloatingMultiSelect';

export { FloatingMultiSelect };
