import { TableCell, TableRow } from '../ui/table';

// ----------------------------------------------------------------------

interface CustomTableEmptyRowProps {
    dataLength: number;
    pageSize: number;
}

export default function CustomTableEmptyRow({ dataLength, pageSize = 5 }: CustomTableEmptyRowProps) {
    if (dataLength === 0) return null;
    const remainingRows = pageSize - (dataLength % pageSize);

    if (remainingRows === pageSize) return null;

    return Array.from(Array(remainingRows).keys()).map((i, idx) => (
        <TableRow key={i} className="pointer-events-none border-none">
            <TableCell key={idx} colSpan={12}></TableCell>
        </TableRow>
    ));
}
