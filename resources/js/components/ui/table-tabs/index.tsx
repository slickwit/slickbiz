import type { ComponentProps, ReactNode } from 'react';
import { TabsTrigger } from '../tabs';

// ----------------------------------------------------------------------

export { CustomScrollableTabs as ScrollableTabs } from './scrollable-tabs';
export { CustomTab as Tab } from './tab';
export { CustomTabs as Tabs } from './tabs';

export interface ITabsOption {
    value: string;
    label: ReactNode;
    icon?: TLabelIcon;
    props?: Omit<ComponentProps<typeof TabsTrigger>, 'value'>;
}

export type TLabelIcon = {
    label: string | number;
    color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
    variant?: 'contained' | 'outlined' | 'ghost';
};
