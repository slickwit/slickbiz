import { EmptyContent } from '../ui/empty-content';
import { TableCell, TableRow } from '../ui/table';

// ----------------------------------------------------------------------

interface CustomTableNoDataProps {
    columnLength: number;
    notFound: boolean;
}

export default function CustomTableNoData({ columnLength, notFound }: CustomTableNoDataProps) {
    return (
        <TableRow>
            <TableCell
                colSpan={columnLength}
                className="h-96 p-4 text-center transition-all group-data-[dense=md]:py-2 group-data-[dense=sm]:px-2.5 group-data-[dense=sm]:py-1"
            >
                <EmptyContent className="h-full" title={notFound ? 'No Data Found' : 'No Data'} />
            </TableCell>
        </TableRow>
    );
}
