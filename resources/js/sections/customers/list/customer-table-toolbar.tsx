// import { SearchInput } from "@/components/input";
import { Button } from '@/components/ui/buttons/button';
import { FloatingLabelButon } from '@/components/ui/buttons/floating-label-button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FloatingLabelInput } from '@/components/ui/inputs/floating-label-input';
import { cn } from '@/lib/utils';
import { User } from '@/types/user.type';
import { splitCase } from '@/utils/change-case';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import type { Column } from '@tanstack/react-table';

// ----------------------------------------------------------------------

interface CustomerTableToolbarProps {
    canHideColumns: Column<User, unknown>[];
}

const ROLES_OPTIONS = ['user', 'admin'];

export default function CustomerTableToolbar({ canHideColumns }: CustomerTableToolbarProps) {
    const searchParams = new URLSearchParams(window.location.search);
    const roleParams = searchParams.get('roles');
    const roles = roleParams && roleParams !== null ? roleParams.split(',') : [];
    // const [searchValue, setSearchValue] = useState(searchParams.get('status') ?? '');
    return (
        <div className="inline-flex w-full flex-wrap items-center gap-2 p-4 md:flex-nowrap md:gap-3">
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <FloatingLabelButon className="w-1/5" label="Role" value={roles.join(',')} endIcon={<ChevronDownIcon className="h-4 w-4" />} />
                    {/* <FloatingLabelButon
                        variant="outline"
                        data-filtered={roles.length > 0}
                        className="w-[calc(50%_-_theme(spacing.2))] justify-between border-input/35 data-[filtered=true]:text-popover-foreground data-[state=open]:ring-2 md:w-56"
                    >
                        <span className="overflow-hidden text-ellipsis">{roles.length > 0 ? roles.join(', ') : 'Role'}</span>
                        <span className="ml-auto">
                            <ChevronDownIcon className="h-4 w-4" />
                        </span>
                    </FloatingLabelButon> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={8} align="center" className="max-h-56 w-full max-w-max space-y-1.5 overflow-auto">
                    {ROLES_OPTIONS.map((value) => {
                        const selected = roles.some((role) => role === value);
                        return (
                            <div
                                key={value}
                                // onClick={() => onSearchRole(value, selected)}
                                className={cn(
                                    'flex cursor-pointer items-center rounded-md px-1.5 py-2 select-none hover:bg-accent dark:hover:bg-accent/10',
                                    {
                                        'bg-accent font-medium dark:bg-accent/10': selected,
                                    },
                                )}
                            >
                                <Checkbox
                                    checked={selected}
                                    color="secondary"
                                    // onCheckedChange={() => onSearchRole(value, selected)}
                                />
                                <span className="ml-2 text-sm whitespace-nowrap capitalize">{value}</span>
                            </div>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-full w-[calc(50%_-_theme(spacing.2))] border-input/35 data-[state=open]:ring-2 md:w-56">
                        <span className="overflow-hidden text-ellipsis">Columns</span>
                        <span className="ml-auto">
                            <ChevronDownIcon className="h-4 w-4" />
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={8} align="center" className="max-h-56">
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

            <FloatingLabelInput label="Search name..." className="w-full" containerProps={{ className: 'w-full' }} />
            {/* <SearchInput
                placeholder="Search name..."
                className="w-full"
                value={(table.getColumn('fullname')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('fullname')?.setFilterValue(event.target.value)}
                onClear={() => {
                    table.getColumn('fullname')?.setFilterValue('');
                }}
            /> */}
        </div>
    );
}
