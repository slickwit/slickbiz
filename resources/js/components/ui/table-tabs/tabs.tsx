import { type ReactNode } from 'react';
import { ITabsOption } from '.';
import { Tabs, TabsList, TabsTrigger } from '../tabs';

// ----------------------------------------------------------------------

interface CustomTabsProps<T extends ITabsOption[]> {
    children?: ReactNode;
    options: ITabsOption[];
    value?: T[number]['value'];
    onChange?: (value: T[number]['value']) => void;
}

export function CustomTabs<T extends ITabsOption[]>({ children, value, onChange, options }: CustomTabsProps<T>) {
    const handleChange = (value: string) => {
        if (onChange) {
            onChange(value as T[number]['value']);
        }
    };
    return (
        <Tabs value={value} onValueChange={onChange ? handleChange : undefined} className="h-full">
            <TabsList className="h-full flex-wrap bg-transparent p-0">
                {options.map((option) => {
                    // const variant = option?.icon?.variant || (option.value === value ? "contained" : "ghost");
                    return (
                        <TabsTrigger
                            className="[&[data-state=active]>span]:text-common before:bg-common relative h-12 space-x-1.5 before:absolute before:bottom-0 before:h-[0.1rem] before:w-0 before:transition-all before:duration-150 before:content-[''] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:before:w-full"
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                            {/* <span className="font-medium">{option.label}</span>
							{!!option.icon && (
								<Label className="label-icon" variant={variant} color={option.icon.color}>
									{option.icon.label}
								</Label>
							)} */}
                        </TabsTrigger>
                    );
                })}
            </TabsList>
            {children}
        </Tabs>
    );
}
