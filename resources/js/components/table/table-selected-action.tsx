import { cn } from '@/lib/utils';
import type { Table } from '@tanstack/react-table';
import { type ReactNode } from 'react';
import { Checkbox } from '../ui/checkbox';

// ----------------------------------------------------------------------

interface TableSelectedActionProps<T> {
    action?: ReactNode;
    table: Table<T>;
    columnLength: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableSelectedAction<T extends Record<string, any>>({ action, table, columnLength = 0 }: TableSelectedActionProps<T>) {
    const numSelected = table.getFilteredSelectedRowModel().rows.length;

    if (numSelected === 0) return null;

    const isSomeRowsSelected = table.getIsSomeRowsSelected();
    const isAllRowsSelected = table.getIsAllRowsSelected();
    const isAllPageRowsSelected = table.getIsAllPageRowsSelected();

    const handleSelect = () => {
        if (isAllRowsSelected) {
            table.toggleAllRowsSelected(false);
        } else if (isAllPageRowsSelected) {
            table.toggleAllRowsSelected(true);
        } else if (isSomeRowsSelected) {
            table.toggleAllPageRowsSelected(true);
        }
    };

    return (
        <thead className={cn('absolute top-0 left-0 z-30 w-full')}>
            <tr className="flex h-full w-full items-center bg-primary">
                <th
                    className="flex h-14 w-full items-center justify-between px-4 text-left align-middle font-medium whitespace-nowrap text-foreground transition-all group-data-[dense=md]:h-12 group-data-[dense=sm]:h-11 group-data-[dense=sm]:px-2.5 [&>[role=checkbox]]:translate-y-[2px]"
                    colSpan={columnLength}
                >
                    <div className="flex items-center gap-4">
                        <Checkbox
                            variant="primary"
                            className="data-[state=checked]:border-input data-[state=indeterminate]:border-input"
                            checked={isAllRowsSelected || 'indeterminate'}
                            onCheckedChange={handleSelect}
                        />

                        <h6 className="text-sm font-bold text-primary-foreground">
                            {numSelected} of {table.getFilteredRowModel().rows.length} row(s) selected.
                        </h6>
                    </div>

                    {!!action && action}
                </th>
            </tr>
        </thead>
    );
}
