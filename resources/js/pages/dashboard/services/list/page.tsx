import { Breadcrumbs } from '@/components/breadcrumbs';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import ServiceListView from '@/sections/services/list/service-list';
import { PaginateResponse, type BreadcrumbItem } from '@/types';
import { Service } from '@/types/service-management.type';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Services',
        href: '/services',
    },
];

interface ServicesProps {
    services: PaginateResponse<Service>;
}

export default function Services({ services }: ServicesProps) {
    console.log(services);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />
            <Container className="mt-16 lg:mt-24" maxWidth="xl">
                <div className="mb-8 lg:mb-12">
                    <h4 className="text-md mb-2 font-bold text-slate-800 lg:text-lg xl:text-2xl dark:text-slate-200">List</h4>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <ServiceListView services={services.data} />
            </Container>
        </AppLayout>
    );
}
