'use client';
import { FloatingLabelButon } from '@/components/ui/buttons/floating-label-button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronsUpDown, Square, SquareCheckBig } from 'lucide-react';
import * as React from 'react';
import { Controller, type FieldPath, type FieldValues, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type SelectOption = {
    label: string;
    value: string;
};

interface CustomRHFMultiSelectProps<TFieldValues extends FieldValues>
    extends Omit<React.ComponentPropsWithoutRef<typeof Controller>, 'name' | 'control' | 'render'> {
    name: FieldPath<TFieldValues>;
    btnProps?: Omit<React.ComponentPropsWithoutRef<typeof FloatingLabelButon>, 'value' | 'label'>;
    popoverProps?: React.ComponentPropsWithoutRef<typeof PopoverContent>;
    helperText?: string;
    containerClass?: string;
    label: string;
    options: SelectOption[];
}

export default function CustomRHFMultiSelect<TFieldValues extends FieldValues>({
    name,
    label,
    helperText,
    defaultValue,
    rules,
    containerClass,
    btnProps = {
        variant: 'outline',
        size: 'md',
        className: 'w-full justify-between',
    },
    popoverProps,
    options,
}: CustomRHFMultiSelectProps<TFieldValues>) {
    const btnRef = React.useRef<React.ElementRef<'button'>>(null);
    const [open, setOpen] = React.useState(false);
    const { control } = useFormContext();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleValueChange = React.useCallback((value: string, inputValue: string, onChange: (...event: any[]) => void) => {
        const values = inputValue.trim() === '' ? [] : inputValue.split(',');
        const valIdx = values.findIndex((val) => val === value);
        if (valIdx === -1) {
            values.push(value);
        } else {
            values.splice(valIdx, 1);
        }
        onChange(values.join(','));
        setOpen(false);
    }, []);

    const popOverStyle = btnRef.current ? { width: btnRef.current.clientWidth } : {};
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div className={containerClass}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FloatingLabelButon
                                    role={name + '-popover'}
                                    aria-expanded={open}
                                    {...btnProps}
                                    ref={btnRef}
                                    label={label}
                                    value={field.value}
                                    endIcon={<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
                                    error={!!error}
                                />
                            </PopoverTrigger>
                            <PopoverContent
                                {...popoverProps}
                                style={popOverStyle}
                                className={cn('w-full min-w-[--radix-popper-anchor-width] space-y-0 p-0', popoverProps?.className)}
                            >
                                {options.map((option, index) => {
                                    const selected = (field.value as string).split(',').findIndex((val) => val === option.value) !== -1;
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => handleValueChange(option.value, field.value, field.onChange)}
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
                        <div className="mt-2 space-y-2">
                            {!!helperText && <p className="ml-1.5 text-sm text-muted-foreground">{helperText}</p>}
                            {!!error && <p className="ml-1.5 text-sm text-error">{error?.message}</p>}
                        </div>
                    </div>
                );
            }}
        />
    );
}
