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
        <TableRow
            key={i}
            className="pointer-events-none h-14 border-dashed transition-[height] group-data-[dense=md]:h-12 group-data-[dense=sm]:h-10"
        >
            <TableCell key={idx} colSpan={12}></TableCell>
        </TableRow>
    ));
}
