import { IconButton } from '@/components/ui/buttons/icon-button';
import { Checkbox } from '@/components/ui/checkbox';
import Avatar from '@/components/ui/custom-avatar/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { User } from '@/types/user.type';
import { fDate } from '@/utils/format-time';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowDown } from 'lucide-react';
import { useMemo } from 'react';

export function useCustomerColumnDef(): ColumnDef<User>[] {
    return useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => {
                    const allPageRowsSelected = table.getIsAllPageRowsSelected();
                    return (
                        <Checkbox
                            // variant="primary"
                            checked={allPageRowsSelected && 'indeterminate'}
                            onCheckedChange={(value) => {
                                if (allPageRowsSelected) {
                                    table.toggleAllRowsSelected(!!value);
                                } else {
                                    table.toggleAllPageRowsSelected(!!value);
                                }
                            }}
                            aria-label="Select all"
                        />
                    );
                },
                cell: ({ row }) => (
                    <Checkbox
                        // variant="primary"
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: 'fullname',
                header: ({ column }) => {
                    const isSorted = column.getIsSorted() === 'asc';
                    return (
                        <div
                            className="relative inline-flex cursor-pointer items-center whitespace-nowrap"
                            onClick={() => column.toggleSorting(isSorted)}
                        >
                            <span>Name</span>
                            <ArrowDown
                                className={cn('absolute -right-4 h-4 w-4 transform opacity-0 transition-all group-hover/header:opacity-100', {
                                    'rotate-180 opacity-100': isSorted,
                                    'opacity-100': typeof column.getIsSorted() === 'string',
                                })}
                            />
                        </div>
                    );
                },
                cell: ({ row }) => {
                    const user = row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar
                                src={'/avatars/default.jpg'}
                                alt={`@${user.username}`}
                                className="mr-4"
                                name={`${user.firstName} ${user.lastName}`}
                            />
                            <div className="items-left flex flex-col">
                                <span className="text-base">
                                    {user.firstName} {user.lastName}
                                </span>
                                <span className="text-disabled">{user.email}</span>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'username',
                header: ({ column }) => {
                    const isSorted = column.getIsSorted() === 'asc';
                    return (
                        <div
                            className="group/header relative inline-flex cursor-pointer items-center whitespace-nowrap"
                            onClick={() => column.toggleSorting(isSorted)}
                        >
                            <span>Username</span>
                            <ArrowDown
                                className={cn('absolute -right-4 h-4 w-4 transform opacity-0 transition-all group-hover/header:opacity-100', {
                                    'rotate-180 opacity-100': isSorted,
                                    'opacity-100': typeof column.getIsSorted() === 'string',
                                })}
                            />
                        </div>
                    );
                },
                cell: ({ row }) => <div className="capitalize">{row.getValue('username')}</div>,
            },
            {
                accessorKey: 'createdAt',
                header: ({ column }) => {
                    const isSorted = column.getIsSorted() === 'asc';
                    return (
                        <div
                            className="group/header relative inline-flex cursor-pointer items-center whitespace-nowrap"
                            onClick={() => column.toggleSorting(isSorted)}
                        >
                            <span>Date Created</span>
                            <ArrowDown
                                className={cn('absolute -right-4 h-4 w-4 transform opacity-0 transition-all group-hover/header:opacity-100', {
                                    'rotate-180 opacity-100': isSorted,
                                    'opacity-100': typeof column.getIsSorted() === 'string',
                                })}
                            />
                        </div>
                    );
                },
                cell: ({ row }) => <div className="capitalize">{row.original.createdAt ? fDate(row.original.createdAt) : ''}</div>,
            },
            {
                accessorKey: 'role',
                header: ({ column }) => {
                    const isSorted = column.getIsSorted() === 'asc';
                    return (
                        <div
                            className="group/header relative inline-flex cursor-pointer items-center whitespace-nowrap"
                            onClick={() => column.toggleSorting(isSorted)}
                        >
                            <span>Role</span>
                            <ArrowDown
                                className={cn('absolute -right-4 h-4 w-4 transform opacity-0 transition-all group-hover/header:opacity-100', {
                                    'rotate-180 opacity-100': isSorted,
                                    'opacity-100': typeof column.getIsSorted() === 'string',
                                })}
                            />
                        </div>
                    );
                },
                cell: ({ row }) => <div className="capitalize">{row.getValue('role')}</div>,
            },
            {
                accessorKey: 'status',
                header: ({ column }) => {
                    const isSorted = column.getIsSorted() === 'asc';
                    return (
                        <div
                            className="group/header relative inline-flex cursor-pointer items-center whitespace-nowrap"
                            onClick={() => column.toggleSorting(isSorted)}
                        >
                            <span>Status</span>
                            <ArrowDown
                                className={cn('absolute -right-4 h-4 w-4 transform opacity-0 transition-all group-hover/header:opacity-100', {
                                    'rotate-180 opacity-100': isSorted,
                                    'opacity-100': typeof column.getIsSorted() === 'string',
                                })}
                            />
                        </div>
                    );
                },
                cell: ({ row }) => {
                    const val = row.getValue('status') as string;
                    return (
                        <Label
                            // variant="ghost"
                            color={(val === 'active' && 'success') || (val === 'pending' && 'warning') || (val === 'banned' && 'error') || 'default'}
                        >
                            {val}
                        </Label>
                    );
                },
            },
            {
                id: 'actions',
                enableHiding: false,
                cell: ({ row }) => {
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <IconButton>
                                    <span className="sr-only">Open menu</span>
                                    <DotsHorizontalIcon className="h-4 w-4" />
                                </IconButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>Copy user ID</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View customer</DropdownMenuItem>
                                <DropdownMenuItem>View user details</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
                enableSorting: false,
            },
        ],
        [],
    );
}
