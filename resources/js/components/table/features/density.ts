/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
    functionalUpdate,
    makeStateUpdater,
    type OnChangeFn,
    type RowData,
    type Table,
    type TableFeature,
    type Updater,
} from '@tanstack/react-table';

export type DensityState = 'sm' | 'md' | 'lg';

export interface DensityTableState {
    density: DensityState;
}

export interface DensityOptions {
    enableDensity?: boolean;
    onDensityChange?: OnChangeFn<DensityState>;
}

export interface DensityInstance {
    setDensity: (updater: Updater<DensityState>) => void;
    toggleDensity: (value?: DensityState) => void;
}

// Use declaration merging to add our new feature APIs and state types to TanStack Table's existing types.
declare module '@tanstack/react-table' {
    // or whatever framework adapter you are using
    //merge our new feature's state with the existing table state
    interface TableState extends DensityTableState {}
    //merge our new feature's options with the existing table options
    interface TableOptionsResolved<TData extends RowData> extends DensityOptions {}
    //merge our new feature's instance APIs with the existing table instance APIs
    interface Table<TData extends RowData> extends DensityInstance {}
    // if you need to add cell instance APIs...
    // interface Cell<TData extends RowData, TValue> extends DensityCell
    // if you need to add row instance APIs...
    // interface Row<TData extends RowData> extends DensityRow
    // if you need to add column instance APIs...
    // interface Column<TData extends RowData, TValue> extends DensityColumn
    // if you need to add header instance APIs...
    // interface Header<TData extends RowData, TValue> extends DensityHeader

    // Note: declaration merging on `ColumnDef` is not possible because it is a complex type, not an interface.
    // But you can still use declaration merging on `ColumnDef.meta`
}

declare module '@tanstack/react-table' {
    interface TableState extends DensityTableState {}
    interface TableOptionsResolved<TData extends RowData> extends DensityOptions {}
    interface Table<TData extends RowData> extends DensityInstance {}
}

declare module '@tanstack/table-core' {
    interface ColumnMeta<TData extends RowData, TValue> {
        align: 'center' | 'left' | 'right' | 'justify' | 'char' | undefined;
    }
}

// ----------------------------------------------------------------------

export const DensityFeature: TableFeature<unknown> = {
    // define the new feature's initial state
    getInitialState: (state): DensityTableState => {
        return {
            density: 'md',
            ...state,
        };
    },

    // define the new feature's default options
    getDefaultOptions: <TData extends RowData>(table: Table<TData>): DensityOptions => {
        return {
            enableDensity: true,
            onDensityChange: makeStateUpdater('density', table),
        } as DensityOptions;
    },
    // if you need to add a default column definition...
    // getDefaultColumnDef: <TData extends RowData>(): Partial<ColumnDef<TData>> => {
    //   return { meta: {} } //use meta instead of directly adding to the columnDef to avoid typescript stuff that's hard to workaround
    // },

    // define the new feature's table instance methods
    createTable: <TData extends RowData>(table: Table<TData>): void => {
        table.setDensity = (updater) => {
            const safeUpdater: Updater<DensityState> = (old) => {
                const newState = functionalUpdate(updater, old);
                return newState;
            };
            return table.options.onDensityChange?.(safeUpdater);
        };
        table.toggleDensity = (value) => {
            table.setDensity((old) => {
                if (value) return value;
                return old === 'lg' ? 'md' : old === 'md' ? 'sm' : 'lg'; //cycle through the 3 options
            });
        };
    },

    // if you need to add row instance APIs...
    // createRow: <TData extends RowData>(row, table): void => {},
    // if you need to add cell instance APIs...
    // createCell: <TData extends RowData>(cell, column, row, table): void => {},
    // if you need to add column instance APIs...
    // createColumn: <TData extends RowData>(column, table): void => {},
    // if you need to add header instance APIs...
    // createHeader: <TData extends RowData>(header, table): void => {},
};
