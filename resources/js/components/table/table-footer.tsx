import { IconButton } from '@/components/ui/icon-button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { usePagination } from '@/hooks';
import { type Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from 'lucide-react';
import { useCallback, useState } from 'react';
import { type DensityState } from './features/density';

// ----------------------------------------------------------------------

interface TableCustomFooterProps<T> {
    table: Table<T>;
}

export default function TableCustomFooter<T>({ table }: TableCustomFooterProps<T>) {
    const {
        getCanPreviousPage,
        getCanNextPage,
        getState,
        setPageIndex,
        setPageSize,
        firstPage,
        previousPage,
        nextPage,
        lastPage,
        setDensity,
        initialState,
    } = table;
    const [densityState, setDensityState] = useState(initialState.density);
    const canPreviousPage = getCanPreviousPage();
    const canNextPage = getCanNextPage();
    const { pageSize, pageIndex } = getState().pagination;
    const totalCount = table.getRowCount();

    const paginationRange = usePagination({
        totalCount,
        pageSize,
        siblingCount: 1,
        currentPage: pageIndex + 1,
    });

    const handlePaginate = useCallback(
        (paginate: number) => {
            setPageIndex(paginate - 1);
        },
        [setPageIndex],
    );

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value));
    };

    const handleToggleChange = (value: DensityState) => {
        setDensity(value);
        setDensityState(value);
    };

    return (
        <div className="relative flex flex-col items-baseline border-t p-2.5 md:flex-row-reverse md:items-center md:p-4">
            <div className="mb-2 flex w-full flex-wrap items-center justify-end max-lg:flex-col-reverse max-lg:items-end sm:mb-0 md:space-x-4">
                <div className="block h-8 max-sm:absolute max-sm:right-2.5 max-sm:bottom-2.5 sm:h-10">
                    <div className="flex items-center space-x-1">
                        <Label htmlFor="row-per-page-select" className="text-sm text-common">
                            Rows per page:
                        </Label>
                        <Select onValueChange={handlePageSizeChange} value={pageSize + ''}>
                            <SelectTrigger id="row-per-page-select" className="h-8 w-fit sm:h-10">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent side="bottom" align="center" className="w-fit min-w-10">
                                {['5', '10', '15', '20', '25', '50'].map((num) => (
                                    <SelectItem key={num} value={num}>
                                        {num}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex w-full flex-wrap items-center justify-center space-x-1 sm:justify-start md:w-auto">
                    <IconButton transitionOff onClick={firstPage} disabled={!canPreviousPage}>
                        <ChevronsLeft />
                    </IconButton>
                    <IconButton transitionOff onClick={previousPage} disabled={!canPreviousPage}>
                        <ChevronLeft />
                    </IconButton>
                    {paginationRange && paginationRange.length > 0 ? (
                        paginationRange?.map((paginate, idx) => (
                            <IconButton
                                key={idx}
                                onClick={() => handlePaginate(paginate ?? 1)}
                                transitionOff
                                disabled={!paginate || pageIndex + 1 === paginate}
                                data-active={paginate === pageIndex + 1}
                                className="text-sm font-medium data-[active=true]:bg-common/12 data-[active=true]:font-bold data-[active=true]:text-common data-[active=true]:opacity-100"
                            >
                                {paginate !== null ? paginate : <Ellipsis width={16} height={16} className="!size-4" />}
                            </IconButton>
                        ))
                    ) : (
                        <IconButton transitionOff className="pointer-events-none bg-common/12 text-sm font-bold text-common opacity-100">
                            1
                        </IconButton>
                    )}
                    <IconButton transitionOff onClick={nextPage} disabled={!canNextPage}>
                        <ChevronRight />
                    </IconButton>
                    <IconButton transitionOff onClick={lastPage} disabled={!canNextPage}>
                        <ChevronsRight />
                    </IconButton>
                </div>
            </div>
            <div className="flex h-8 items-center space-x-2 self-start sm:h-10">
                <ToggleGroup variant="outline" type="single" size="sm" value={densityState} onValueChange={handleToggleChange}>
                    <ToggleGroupItem className="text-xs font-semibold" value="sm">
                        SM
                    </ToggleGroupItem>
                    <ToggleGroupItem className="text-xs font-semibold" value="md">
                        MD
                    </ToggleGroupItem>
                    <ToggleGroupItem className="text-xs font-semibold" value="lg">
                        LG
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </div>
    );
}
