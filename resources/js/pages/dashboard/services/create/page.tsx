import { Breadcrumbs } from '@/components/breadcrumbs';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { paths } from '@/layouts/dashboard/configs/paths';
import { PaginateResponse, type BreadcrumbItem } from '@/types';
import { Service } from '@/types/service-management.type';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route(paths.dashboard.root),
    },
    {
        title: 'Services',
        href: route(paths.dashboard.services.root),
    },
    {
        title: 'New Service',
        href: route(paths.dashboard.services.create),
    },
];

interface ServicesProps {
    services: PaginateResponse<Service>;
}

export default function Services(props: ServicesProps) {
    console.log(props);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />
            <Container className="mt-16 lg:mt-24" maxWidth="xl">
                <div className="mb-8 flex items-center justify-between lg:mb-12">
                    <div>
                        <h4 className="text-md mb-2 font-bold text-slate-800 lg:text-lg xl:text-2xl dark:text-slate-200">New a new service</h4>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            </Container>
        </AppLayout>
    );
}
