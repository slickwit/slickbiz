import { Button } from '@/components/ui/buttons/button';
import { Chip } from '@/components/ui/chip';
import type { SharedData } from '@/types';
import type { Category, Service } from '@/types/service-management.type';
import { splitCase } from '@/utils/change-case';
import { router, usePage } from '@inertiajs/react';
import type { Column, ColumnFiltersState } from '@tanstack/react-table';
import { LucideTrash2 } from 'lucide-react';
import { type Dispatch, type SetStateAction } from 'react';

// ----------------------------------------------------------------------

interface ServiceTableFilterResultProps {
    result: number;
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
    canHideColumns: Column<Service, unknown>[];
}

interface SharedDataWPageProps extends SharedData {
    categories: Category[];
}

export default function ServiceTableFilterResult({ result, canHideColumns, setColumnFilters }: ServiceTableFilterResultProps) {
    const {
        props: { categories },
    } = usePage<SharedDataWPageProps>();
    const hiddenColumns = canHideColumns.filter((column) => !column.getIsVisible());
    const urlSearchParams = new URLSearchParams(window.location.search);

    const searchParams = urlSearchParams.get('search') || '';
    const searchCategories = urlSearchParams.get('categories') || '';

    const filteredCategories = searchCategories ? searchCategories.split(',') : [];

    const handleClearFilter = () => {
        setColumnFilters([]);
        router.get('/dashboard/services', undefined, { replace: true });
    };

    const handleRemoveSearchFilter = () => {
        const params: Record<string, string> = {};
        if (filteredCategories.length) {
            params.categories = searchCategories;
        }
        router.get(route('dashboard.services.index'), params, { preserveScroll: true, replace: true });
    };

    const handleRemoveCategoryFilter = (category: string) => () => {
        const params: Record<string, string> = {};

        const newCategories = filteredCategories.filter((cat) => cat !== category);
        if (newCategories.length) {
            params.categories = newCategories.join(',');
        }

        if (searchParams) {
            params.search = searchParams;
        }
        router.get(route('dashboard.services.index'), params, { preserveScroll: true, replace: true, only: ['services'] });
    };
    const isFiltered = hiddenColumns.length || searchParams || filteredCategories.length;

    if (!isFiltered) return null;

    return (
        <div className="-mt-1.5 flex flex-col gap-2 p-4 shadow-[rgba(145,_158,_171,_0.08)_0px_2px_0px_0px_inset]">
            <div className="mb-1.5 flex w-full items-center justify-between">
                <span className="text-sm text-foreground">
                    <strong className="text-slate-800 dark:text-slate-200">{result}</strong> result&apos;s found
                </span>
                <Button onClick={handleClearFilter} variant="soft" size="sm" color="error" startIcon={<LucideTrash2 width={20} height={20} />}>
                    Clear
                </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
                {filteredCategories.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed p-2">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Categories:</span>
                        <div className="flex flex-wrap gap-2 lg:flex-1">
                            {filteredCategories.map((category) => {
                                const value = categories.find((c) => c.id + '' == category)?.name || '';
                                return <Chip key={category} label={value} onDelete={handleRemoveCategoryFilter(category)} deletable />;
                            })}
                        </div>
                    </div>
                )}
                {!!searchParams && (
                    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed p-2">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Keyword:</span>
                        <Chip label={searchParams} onDelete={handleRemoveSearchFilter} deletable />
                    </div>
                )}
                {hiddenColumns.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed p-2">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Hidden Columns:</span>
                        <div className="flex flex-row flex-wrap gap-2 lg:flex-1">
                            {hiddenColumns.map((column) => (
                                <Chip
                                    key={column.id}
                                    labelProps={{ className: 'capitalize' }}
                                    label={splitCase(column.id)}
                                    onDelete={() => column.toggleVisibility(true)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
