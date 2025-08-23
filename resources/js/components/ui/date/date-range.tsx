'use client';
import { Button } from '@/components/ui/buttons/button';
import { FloatingLabelButon } from '@/components/ui/buttons/floating-label-button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { shortDateLabel } from '@/lib/format-time';
import { cn } from '@/lib/utils';
import { CalendarDaysIcon } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { type SelectRangeEventHandler } from 'react-day-picker';

// ----------------------------------------------------------------------

interface DateRangePickerProps {
    startDate?: Date;
    endDate?: Date;
    onSelect?: SelectRangeEventHandler;
    onClear?: () => void;
    label?: string;
    btnProps?: ComponentPropsWithoutRef<typeof FloatingLabelButon>;
    calendarProps?: Omit<ComponentPropsWithoutRef<typeof Calendar>, 'selected' | 'onSelect' | 'mode'>;
}

export default function DateRangePicker({
    startDate,
    endDate,
    onSelect,
    onClear,
    btnProps,
    calendarProps,
    label = 'Pick a date',
}: DateRangePickerProps) {
    const shortLabel = shortDateLabel(startDate, endDate);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FloatingLabelButon
                    variant="outline"
                    label={label}
                    value={shortLabel ?? ''}
                    {...btnProps}
                    className={cn(
                        'w-full justify-start overflow-x-clip py-1 text-sm font-medium select-none',
                        !shortLabel && 'text-muted-foreground',
                        btnProps?.className,
                    )}
                    endIcon={
                        <IconButton size="md" asChild>
                            <CalendarDaysIcon className="fill-common/12 stroke-common/80 aria-selected: size-9 max-h-9 min-h-9 max-w-9 min-w-9 !p-1.5 hover:bg-foreground/5" />
                        </IconButton>
                    }
                />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="range"
                    selected={{ from: startDate, to: endDate }}
                    onSelect={onSelect}
                    numberOfMonths={2}
                    // initialFocus
                    // captionLayout="dropdown-buttons"
                    // fromYear={1990}
                    {...calendarProps}
                />
                {!!onClear && (
                    <Button onClick={onClear} variant="ghost" className="h-8 w-full text-sm font-medium">
                        Clear
                    </Button>
                )}
            </PopoverContent>
        </Popover>
    );
}
