import { type HTMLAttributes } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import type { DensityState } from "@/types/tables";

// ----------------------------------------------------------------------

interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
	dense: DensityState;
}

export default function TableContainer({ children, className, dense }: TableContainerProps) {
	return (
		<Card className={className}>
			<CardContent data-dense={dense} className={cn("p-0 group [&_th]:font-medium")}>
				{children}
			</CardContent>
		</Card>
	);
}
