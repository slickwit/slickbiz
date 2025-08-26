import { Breadcrumbs } from '@/components/breadcrumbs';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import CustomerListView from '@/sections/customers/list/customer-list';
import { type BreadcrumbItem } from '@/types';
import type { User } from '@/types/user.type';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Customers',
        href: '/customers',
    },
];

export default function Customers({ customers = [] }: { customers: User[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <Container className="mt-16">
                <div className="mb-8 lg:mb-12">
                    <h4 className="text-md mb-2 font-bold text-slate-800 lg:text-lg xl:text-2xl dark:text-slate-200">List</h4>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <CustomerListView customers={customers} />
            </Container>
        </AppLayout>
    );
}
