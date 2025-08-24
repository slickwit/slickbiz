import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';
import { TabsList, TabsTrigger } from '../tabs';

// ----------------------------------------------------------------------

interface CustomTabProps extends ComponentPropsWithoutRef<typeof TabsList> {
    value: string;
    triggerProps?: Omit<ComponentPropsWithoutRef<typeof TabsTrigger>, 'value'>;
    children: React.ReactNode;
    className?: string;
}

export function CustomTab({ children, triggerProps = {}, value = '', ...props }: CustomTabProps) {
    return (
        <TabsList {...props} className={cn('h-full flex-wrap bg-transparent p-0', props.className)}>
            <TabsTrigger
                {...triggerProps}
                value={value}
                className={cn(
                    "[&[data-state=active]>span]:text-common before:bg-common relative space-x-1.5 before:absolute before:bottom-[-1px] before:h-[0.1rem] before:w-0 before:transition-all before:duration-150 before:content-[''] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:before:w-full",
                    triggerProps?.className,
                )}
            >
                {children}
            </TabsTrigger>
        </TabsList>
    );
}
