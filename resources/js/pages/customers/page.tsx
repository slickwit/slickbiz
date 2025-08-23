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

const generateId = (): string => {
    return Math.random().toString(36).substring(2, 10);
};

export const dummyUsers: User[] = [
    {
        id: generateId(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'hashed_password_1',
        role: 'admin',
        status: 'active',
        profilePic: 'https://placehold.co/200x200/png',
        empId: 'EMP001',
        subId: 101,
        emailVerifiedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: generateId(),
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        username: 'janesmith',
        password: 'hashed_password_2',
        role: 'user',
        status: 'active',
        subId: 102,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: generateId(),
        firstName: 'Peter',
        lastName: 'Jones',
        email: 'peter.jones@example.com',
        username: 'peterj',
        password: 'hashed_password_3',
        role: 'user',
        status: 'banned',
        subId: 103,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
    },
    {
        id: generateId(),
        firstName: 'Emily',
        lastName: 'Clark',
        email: 'emily.clark@example.com',
        username: 'emilyc',
        password: 'hashed_password_4',
        role: 'user',
        status: 'active',
        profilePic: 'https://placehold.co/200x200/png',
        subId: 104,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function Customers() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <CustomerListView users={dummyUsers} />
        </AppLayout>
    );
}
