import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { UserWithProfile } from './user.type';

export type TClassName = HTMLProps<HTMLElement>['className'];

export interface Auth {
    user: UserWithProfile;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

interface Configuration {
    currency_symbol: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    config: Configuration;
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

// Define the type for the links within the meta object
export type PaginateLink = {
    active: boolean;
    url: string | null;
    label: string;
    active: boolean;
};

export interface PaginateResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginateLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
