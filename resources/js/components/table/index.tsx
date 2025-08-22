// ----------------------------------------------------------------------

export {
    TableFooter as ShadcnTableFooter,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableHeaderRow,
    TableRow,
} from './shadcn-table';
export { default as TableContainer } from './table-container';
export { default as TableEmptyRow } from './table-empty-row';
export { default as TableFooter } from './table-footer';
export { default as TableNoData } from './table-no-data';
export { default as TableSelectedAction } from './table-selected-action';

export interface ITabsOption {
    value: string;
    label: string;
    icon?: TLabelIcon;
}

export type TLabelIcon = {
    label: string | number;
    color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
    variant?: 'contained' | 'outlined' | 'ghost';
};
