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
import CustomerTableTab from './customer-table-tab';
import CustomerTableToolbar from './customer-table-toolbar';

// ----------------------------------------------------------------------

interface CustomerListViewProps {
    users: User[];
}

export default function CustomerListView({ users }: CustomerListViewProps) {
    const columns = useCustomerColumnDef();
    const { table, rows, density, canHideColumns } = useTable({
        data: users,
        columns,
    });

    const isFiltered = false;
    return (
        <TableContainer dense={density}>
            <CustomerTableTab data={users} canHideColumns={canHideColumns} />

            <CustomerTableToolbar canHideColumns={canHideColumns} />

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
                                <Trash2Icon className="size-5" />
                            </IconButton>
                        }
                    />
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableHeaderRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
