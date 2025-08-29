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
import { Service } from '@/types/service-management.type';
import { flexRender } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';
import { useServiceColumnDef } from './service-table-column';
import ServiceTableFilterResult from './service-table-filter-result';
import ServiceTableRow from './service-table-row';
import ServiceTableTab from './service-table-tab';

// ----------------------------------------------------------------------

interface ServiceListViewProps {
    services: Service[];
}

export default function ServiceListView({ services }: ServiceListViewProps) {
    const columns = useServiceColumnDef();
    const { table, rows, density, canHideColumns, setColumnFilters } = useTable({
        data: services,
        columns,
    });

    const isFiltered = false;
    return (
        <TableContainer dense={density}>
            <ServiceTableTab data={services} canHideColumns={canHideColumns} />

            {/* <ServiceTableToolbar canHideColumns={canHideColumns} /> */}

            <ServiceTableFilterResult canHideColumns={canHideColumns} result={rows.length} setColumnFilters={setColumnFilters} />

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
                            rows.map((row) => <ServiceTableRow key={row.id} row={row} />)
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
