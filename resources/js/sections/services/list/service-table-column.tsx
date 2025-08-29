import { Button } from '@/components/ui/buttons/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Label from '@/components/ui/inputs/label';
import { cn } from '@/lib/utils';
import type { SharedData } from '@/types';
import type { Service } from '@/types/service-management.type';
import { fDate } from '@/utils/format-time';
import { usePage } from '@inertiajs/react';
import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowDown } from 'lucide-react';
import { useMemo } from 'react';

export function useServiceColumnDef(): ColumnDef<Service>[] {
    const {
        props: { config },
    } = usePage<SharedData>();
    return useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => {
                    const allPageRowsSelected = table.getIsAllPageRowsSelected();
                    return (
                        <Checkbox
                            variant="primary"
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
                        variant="primary"
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: 'name',
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
                cell: ({ row }) => <span>{row.original.name}</span>,
            },
            {
                accessorKey: 'category.name',
                enableHiding: true,
                header: ({ column }) => {
                    const isSorted = column.getIsSorted() === 'asc';
                    return (
                        <div
                            className="relative inline-flex cursor-pointer items-center whitespace-nowrap"
                            onClick={() => column.toggleSorting(isSorted)}
                        >
                            <span>Category</span>
                            <ArrowDown
                                className={cn('absolute -right-4 h-4 w-4 transform opacity-0 transition-all group-hover/header:opacity-100', {
                                    'rotate-180 opacity-100': isSorted,
                                    'opacity-100': typeof column.getIsSorted() === 'string',
                                })}
                            />
                        </div>
                    );
                },
                cell: ({ row }) => <span>{row.original.category?.name}</span>,
            },
            {
                accessorKey: 'max_capacity',
                enableHiding: true,
                header: ({ column }) => {
                    const isSorted = column.getIsSorted() === 'asc';
                    return (
                        <div
                            className="group/header relative inline-flex cursor-pointer items-center whitespace-nowrap"
                            onClick={() => column.toggleSorting(isSorted)}
                        >
                            <span>Max Capacity</span>
                            <ArrowDown
                                className={cn('absolute -right-4 h-4 w-4 transform opacity-0 transition-all group-hover/header:opacity-100', {
                                    'rotate-180 opacity-100': isSorted,
                                    'opacity-100': typeof column.getIsSorted() === 'string',
                                })}
                            />
                        </div>
                    );
                },
                cell: ({ row }) => <span className="capitalize">{row.original.max_capacity}</span>,
            },
            {
                accessorKey: 'default_price.amount',
                enableHiding: true,
                header: ({ column }) => {
                    const isSorted = column.getIsSorted() === 'asc';
                    return (
                        <div
                            className="group/header relative inline-flex cursor-pointer items-center whitespace-nowrap"
                            onClick={() => column.toggleSorting(isSorted)}
                        >
                            <span>Price</span>
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
                    if (!row.original.default_price) return <span>Price is not set</span>;
                    let priceLabel = `${config.currency_symbol} ${row.original.default_price.amount}/${row.original.default_price.type}`;
                    if (row.original.default_price.type === 'fixed') {
                        priceLabel = `${config.currency_symbol} ${row.original.default_price.amount} fixed`;
                    }
                    return priceLabel;
                },
            },
            {
                accessorKey: 'upcoming_reservations_count',
                header: ({ column }) => {
                    const isSorted = column.getIsSorted() === 'asc';
                    return (
                        <div
                            className="group/header relative inline-flex cursor-pointer items-center whitespace-nowrap"
                            onClick={() => column.toggleSorting(isSorted)}
                        >
                            <span>Upcoming Reservations</span>
                            <ArrowDown
                                className={cn('absolute -right-4 h-4 w-4 transform opacity-0 transition-all group-hover/header:opacity-100', {
                                    'rotate-180 opacity-100': isSorted,
                                    'opacity-100': typeof column.getIsSorted() === 'string',
                                })}
                            />
                        </div>
                    );
                },
                cell: ({ row }) => <span>{row.original.upcoming_reservations_count}</span>,
            },
            {
                accessorKey: 'created_at',
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
                cell: ({ row }) => <div className="capitalize">{row.original.created_at ? fDate(row.original.created_at) : ''}</div>,
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
                    const val = row.original.is_active;
                    return (
                        <Label variant="ghost" color={val ? 'success' : 'error'}>
                            {val ? 'Active' : 'Inactive'}
                        </Label>
                    );
                },
            },
            {
                id: 'actions',
                enableHiding: false,
                enableSorting: false,
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center space-x-1.5">
                            <Button
                                variant="soft"
                                onClick={row.getToggleExpandedHandler()}
                                className={cn('size-8 rounded-full transition-transform', {
                                    'rotate-180': row.getIsExpanded(),
                                })}
                            >
                                <span className="sr-only">Expand</span>
                                <ChevronDownIcon className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="soft" className="size-8 rounded-full">
                                        <span className="sr-only">Open menu</span>
                                        <DotsHorizontalIcon className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>View</DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    );
                },
            },
        ],
        [config.currency_symbol],
    );
}
