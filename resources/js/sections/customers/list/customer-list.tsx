import {
    Table,
    TableBody,
    TableContainer,
    TableEmptyRow,
    TableFooter,
    TableHead,
    TableHeader,
    TableHeaderRow,
    TableNoData,
    TableSelectedAction,
} from '@/components/table';
import { IconButton } from '@/components/ui/icon-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTable } from '@/hooks/use-table';
import type { User } from '@/types/user.type';
import { flexRender } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';
import { useCustomerColumnDef } from './customer-table-column';
import CustomerTableRow from './customer-table-row';

// ----------------------------------------------------------------------

interface CustomerListViewProps {
    users: User[];
}

export default function CustomerListView({ users }: CustomerListViewProps) {
    const columns = useCustomerColumnDef();
    const { table, rows, density } = useTable({
        data: users,
        columns,
    });

    const isFiltered = false;
    return (
        <TableContainer dense={density}>
            {/* <UserTableTabs data={users} canHideColumns={canHideColumns} />

            <UserTableToolbar table={table} canHideColumns={canHideColumns} onSearchRole={handleFilterRoleChange} roles={roles} /> */}

            {/* {isFiltered && (
                <UserFilterResult
                    canHideColumns={canHideColumns}
                    result={rows.length}
                    roles={roles}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    status={status}
                />
            )} */}

            <ScrollArea orientation="horizontal">
                <Table>
                    <TableSelectedAction
                        table={table}
                        columnLength={columns.length}
                        action={
                            <IconButton size="sm" className="text-primary-foreground">
                                <Trash2Icon className="text-error size-5" />
                            </IconButton>
                        }
                    />
                    <TableHeader className="bg-accent dark:bg-accent/10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableHeaderRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className="p-4 transition-all group-data-[dense=md]:py-2 group-data-[dense=sm]:px-2.5 group-data-[dense=sm]:py-1"
                                            key={header.id}
                                        >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableHeaderRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {rows?.length ? (
                            rows.map((row) => <CustomerTableRow key={row.id} row={row} />)
                        ) : (
                            <TableNoData columnLength={columns.length} notFound={isFiltered} />
                        )}
                        <TableEmptyRow dataLength={rows.length} pageSize={table.getState().pagination.pageSize} />
                    </TableBody>
                </Table>
            </ScrollArea>

            <TableFooter table={table} />
        </TableContainer>
    );
}
