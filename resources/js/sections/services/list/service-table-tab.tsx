import { IconButton } from '@/components/ui/buttons/icon-button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FloatingLabelInput } from '@/components/ui/inputs/floating-label-input';
import { FloatingMultiSelect } from '@/components/ui/inputs/floating-multi-select';
import { useDebouncedCallback } from '@/hooks/use-debounce';
import type { SharedData } from '@/types';
import type { Category, Service } from '@/types/service-management.type';
import { splitCase } from '@/utils/change-case';
import { router, usePage } from '@inertiajs/react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import type { Column } from '@tanstack/react-table';
import { SearchIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';

// ----------------------------------------------------------------------

interface ServiceTableTabProps {
    children?: ReactNode;
    data: Service[];
    canHideColumns: Column<Service, unknown>[];
}

interface SharedDataWPageProps extends SharedData {
    categories: Category[];
}

export default function ServiceTableTab({ canHideColumns }: ServiceTableTabProps) {
    const page = usePage<SharedDataWPageProps>();
    const {
        props: { categories },
    } = page;

    const urlSearchParams = new URLSearchParams(window.location.search);

    const searchParams = urlSearchParams.get('search') || '';
    const searchCategories = urlSearchParams.get('categories') || '';

    const [searchTerm, setSearchTerm] = useState(searchParams);

    const handleFilterCategoryChange = (value: string[]) => {
        const params: Record<string, string> = {};
        if (searchParams) {
            params.search = searchParams;
        }
        if (value.length) {
            params.categories = value.join(',');
        }

        router.get(route('dashboard.services.index'), params, {
            replace: true,
            preserveScroll: true,
            only: ['services'],
        });
    };

    const performSearch = useDebouncedCallback((searchValue: string) => {
        const params: Record<string, string> = {};

        // Preserve existing categories
        if (searchCategories) {
            params.categories = searchCategories;
        }

        if (searchValue.trim()) {
            params.search = searchValue.trim();
        }

        router.get(route('dashboard.services.index'), Object.keys(params).length ? params : undefined, {
            replace: true,
            preserveScroll: true,
            only: ['services'],
        });
    }, 500);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        performSearch(value);
    };

    return (
        <div className="flex w-full items-center justify-between border-b border-input p-4">
            <div className="flex w-full flex-wrap items-center gap-2.5">
                <FloatingMultiSelect
                    label="Categories"
                    value={searchCategories ? searchCategories.split(',') : []}
                    options={categories?.map((cat) => ({ label: cat.name, value: cat.id + '' }))}
                    btnProps={{ className: 'w-full' }}
                    containerClass="max-w-[300px] w-full"
                    onChange={handleFilterCategoryChange}
                />
                <FloatingLabelInput
                    label="Search"
                    containerProps={{ className: 'flex-1' }}
                    startIcon={<SearchIcon className="size-5" />}
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    type="search"
                />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <IconButton transitionOff>
                        <DotsVerticalIcon />
                    </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={8} align="center" className="max-h-56">
                    <DropdownMenuLabel>Visible Columns:</DropdownMenuLabel>
                    {canHideColumns.map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="cursor-pointer capitalize hover:bg-common/15"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value: boolean) => column.toggleVisibility(!!value)}
                            >
                                {splitCase(column.id)}
                            </DropdownMenuCheckboxItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
