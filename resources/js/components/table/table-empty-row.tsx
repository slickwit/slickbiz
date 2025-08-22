import { TableCell, TableRow } from "../ui/table";

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
		<TableRow key={i} className="border-none pointer-events-none">
			<TableCell
				className="transition-all p-4 group-data-[dense=sm]:py-1 group-data-[dense=sm]:px-2.5 group-data-[dense=md]:py-2 list-item pointer-events-none"
				key={idx}
				colSpan={12}></TableCell>
		</TableRow>
	));
}
