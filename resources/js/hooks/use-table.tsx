// hooks/useTable.ts
import { DensityFeature, type DensityState } from '@/components/table/features/density';
import {
    type Column,
    type ColumnDef,
    type ColumnFiltersState,
    type Row,
    type SortingState,
    type Table,
    type VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable as useTanstackTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

interface UseTableOptions<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    initialState?: {
        pagination?: {
            pageSize?: number;
        };
    };
}

interface UseTableReturn<TData> {
    table: Table<TData>;
    sorting: SortingState;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
    columnFilters: ColumnFiltersState;
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    columnVisibility: VisibilityState;
    setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
    rowSelection: Record<string, boolean>;
    setRowSelection: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    density: DensityState;
    setDensity: React.Dispatch<React.SetStateAction<DensityState>>;
    tableData: TData[];
    setTableData: React.Dispatch<React.SetStateAction<TData[]>>;
    canHideColumns: Column<TData, unknown>[];
    rows: Row<TData>[];
}

export function useTable<TData>({ data, columns, initialState = {} }: UseTableOptions<TData>): UseTableReturn<TData> {
    const [density, setDensity] = useState<DensityState>('md');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [tableData, setTableData] = useState<TData[]>(data);

    const table = useTanstackTable({
        _features: [DensityFeature],
        data: tableData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onDensityChange: setDensity,
        state: {
            density,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 5,
                ...initialState.pagination,
            },
        },
    });

    return useMemo(
        () => ({
            table,
            sorting,
            setSorting,
            columnFilters,
            setColumnFilters,
            columnVisibility,
            setColumnVisibility,
            rowSelection,
            setRowSelection,
            density,
            setDensity,
            tableData,
            setTableData,
            canHideColumns: table.getAllColumns().filter((column) => column.getCanHide()),
            rows: table.getRowModel().rows,
        }),
        [table, sorting, columnFilters, columnVisibility, rowSelection, density, tableData],
    );
}
