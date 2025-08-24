import { TableCell, TableRow } from '@/components/table';
import { flexRender, type Row } from '@tanstack/react-table';

// ----------------------------------------------------------------------

interface CustomerTableRowProps<T> {
    row: Row<T>;
}

export default function CustomerTableRow<T>({ row }: CustomerTableRowProps<T>) {
    const isSelected = row.getIsSelected();
    const cell = row.getVisibleCells();
    return (
        <TableRow data-state={isSelected && 'selected'}>
            {cell.map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
        </TableRow>
    );
}
