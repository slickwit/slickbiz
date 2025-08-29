import { FloatingLabelButon } from '@/components/ui/buttons/floating-label-button';
import { cn } from '@/lib/utils';
import type { TClassName } from '@/types';
import { Trigger } from '@radix-ui/react-select';
import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { Select, SelectContent, SelectItem } from '../select';

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

interface FloatingSelectProps extends React.ComponentProps<typeof Select> {
    label: string;
    btnProps?: FloatingLabelButonProps;
    options: SelectOption[];
    className?: TClassName;
    selectContentClassName?: TClassName;
}

const FloatingSelect = ({ label, options, className, selectContentClassName, btnProps, ...props }: FloatingSelectProps) => {
    return (
        <Select {...props}>
            <Trigger asChild>
                <FloatingLabelButon
                    variant="outline"
                    endIcon={<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
                    size="md"
                    {...btnProps}
                    className={cn('w-full', className)}
                    label={label}
                    value={props.value}
                />
            </Trigger>
            <SelectContent className={selectContentClassName}>
                <SelectItem value="empty" className="rounded-sm outline-none focus:bg-accent">
                    <span className="text-foreground italic">Empty</span>
                </SelectItem>
                {options.map((o, idx) => (
                    <SelectItem key={idx} value={o.value} className="font-medium">
                        {o.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
FloatingSelect.displayName = 'FloatingSelect';

export { FloatingSelect };
