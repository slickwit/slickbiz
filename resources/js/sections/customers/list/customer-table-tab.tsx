import { IconButton } from '@/components/ui/buttons/icon-button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Label from '@/components/ui/inputs/label';
import { ScrollableTabs, type ITabsOption } from '@/components/ui/table-tabs';
import type { User } from '@/types/user.type';
import { splitCase } from '@/utils/change-case';
import { router } from '@inertiajs/react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import type { Column } from '@tanstack/react-table';
import { useState, type ReactNode } from 'react';

// ----------------------------------------------------------------------

interface CustomerTableTabProps {
    children?: ReactNode;
    data: User[];
    canHideColumns: Column<User, unknown>[];
}

export default function CustomerTableTab({ canHideColumns, data }: CustomerTableTabProps) {
    const searchParams = new URLSearchParams(window.location.search);
    const [searchValue, setSearchValue] = useState(searchParams.get('status') ?? '');

    const handleFilterStatusChange = (value: string) => {
        setSearchValue(value);
        router.get(
            '/customers',
            { status: value },
            {
                replace: true,
                preserveScroll: true,
                preserveState: true,
                // only: ['customers']
            },
        );
    };

    const statuses = { active: 0, pending: 0, banned: 0, rejected: 0 };
    const statusCounts = data.reduce((acc, row) => ({ ...acc, [row.status]: acc[row.status] + 1 }), statuses);

    const STATUS_OPTIONS: ITabsOption[] = [
        {
            value: 'all',
            label: (
                <>
                    <span className="font-medium">All</span>
                    <Label className="label-icon" variant="contained">
                        {data.length}
                    </Label>
                </>
            ),
        },
        {
            value: 'active',
            label: (
                <>
                    <span className="font-medium">Active</span>
                    <Label className="label-icon" color="success">
                        {statusCounts.active}
                    </Label>
                </>
            ),
            props: {
                onMouseEnter: () => {
                    router.prefetch('/customers', { data: { status: 'active' } });
                },
            },
        },
        {
            value: 'pending',
            label: (
                <>
                    <span className="font-medium">Pending</span>
                    <Label className="label-icon" color="warning">
                        {statusCounts.pending}
                    </Label>
                </>
            ),
            props: {
                onMouseEnter: () => {
                    router.prefetch('/customers', { data: { status: 'pending' } });
                },
            },
        },
        {
            value: 'banned',
            label: (
                <>
                    <span className="font-medium">Banned</span>
                    <Label className="label-icon" color="error">
                        {statusCounts.banned}
                    </Label>
                </>
            ),
            props: {
                onMouseEnter: () => {
                    router.prefetch('/customers', { data: { status: 'banned' } });
                },
            },
        },
        {
            value: 'rejected',
            label: (
                <>
                    <span className="font-medium">Rejected</span>
                    <Label className="label-icon" color="secondary">
                        {statusCounts.rejected}
                    </Label>
                </>
            ),
            props: {
                onMouseEnter: () => {
                    router.prefetch('/customers', { data: { status: 'rejected' } });
                },
            },
        },
    ];

    return (
        <div className="border-opacity-15 flex w-full items-center justify-between border-b-2 px-4">
            <ScrollableTabs className="w-full" value={searchValue} onChange={handleFilterStatusChange} options={STATUS_OPTIONS} />
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <IconButton transitionOff>
                            <DotsVerticalIcon />
                        </IconButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={8} align="center" className="max-h-56">
                        <DropdownMenuLabel>Visible Columns:</DropdownMenuLabel>
                        {canHideColumns.map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="cursor-pointer capitalize hover:bg-common/15"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value: boolean) => column.toggleVisibility(!!value)}
                                >
                                    {splitCase(column.id)}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
