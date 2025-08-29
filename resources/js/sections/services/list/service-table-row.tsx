import { TableCell, TableRow } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import Label from '@/components/ui/inputs/label';
import { Service } from '@/types/service-management.type';
import { flexRender, type Row } from '@tanstack/react-table';

// ----------------------------------------------------------------------

interface ServiceTableRowProps {
    row: Row<Service>;
}

export default function ServiceTableRow({ row }: ServiceTableRowProps) {
    const isSelected = row.getIsSelected();
    const cells = row.getVisibleCells();
    const isExpanded = row.getIsExpanded();
    return (
        <>
            <TableRow data-state={isSelected && 'selected'}>
                {cells.map((cell) => (
                    <TableCell
                        key={cell.id}
                        onClick={cell.column.id !== 'select' && cell.column.id !== 'actions' ? row.getToggleExpandedHandler() : undefined}
                        className="cursor-pointer"
                    >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
            </TableRow>
            {isExpanded && (
                <TableRow className="bg-muted/50 hover:bg-muted/70">
                    <TableCell colSpan={cells.length} className="p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Service Details */}
                            <div>
                                <h4 className="mb-2 font-semibold">Service Details</h4>
                                <div className="space-y-1 text-sm">
                                    <p className="text-wrap">
                                        <span className="font-medium">Description:</span> {row.original.description || 'No description'}
                                    </p>
                                    <p>
                                        <span className="font-medium">Min Capacity:</span> {row.original.min_capacity} people
                                    </p>
                                    <p>
                                        <span className="font-medium">Max Capacity:</span> {row.original.max_capacity} people
                                    </p>
                                    <p>
                                        <span className="font-medium">Status:</span>
                                        <Label variant="ghost" color={row.original.is_active ? 'success' : 'error'} className="ml-2">
                                            {row.original.is_active ? 'Active' : 'Inactive'}
                                        </Label>
                                    </p>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div>
                                <h4 className="mb-2 font-semibold">Pricing</h4>
                                {row.original.price ? (
                                    <div className="space-y-1 text-sm">
                                        <p>
                                            <span className="font-medium">Default Price:</span> ${row.original.price.amount}
                                        </p>
                                        <p>
                                            <span className="font-medium">Type:</span> {row.original.price.type}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No default price set</p>
                                )}
                                {row.original.conditional_pricings && row.original.conditional_pricings.length && (
                                    <>
                                        <h4 className="mt-2 font-semibold">Condition Prices</h4>
                                        {row.original.conditional_pricings?.map((price) => (
                                            <div className="space-y-1 text-sm" key={price.id}>
                                                <p>
                                                    <span className="font-medium">Default Price:</span> ${price.amount}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Type:</span> {price.type}
                                                </p>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>

                            {/* Statistics */}
                            <div>
                                <h4 className="mb-2 font-semibold">Reservation Stats</h4>
                                <div className="space-y-1 text-sm">
                                    <p>
                                        <span className="font-medium">Total Reservations:</span> {row.original.reservations_count || 0}
                                    </p>
                                    <p>
                                        <span className="font-medium">Upcoming:</span> {row.original.upcoming_reservations_count || 0}
                                    </p>
                                    <p>
                                        <span className="font-medium">Completed:</span> {row.original.completed_reservations_count || 0}
                                    </p>
                                    <p>
                                        <span className="font-medium">Cancelled:</span> {row.original.cancelled_reservations_count || 0}
                                    </p>
                                </div>
                            </div>

                            {/* Features */}
                            {row.original.features && row.original.features.length > 0 && (
                                <div className="md:col-span-2 lg:col-span-3">
                                    <h4 className="mb-2 font-semibold">Features</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {row.original.features.map((feature, index) => (
                                            <Badge key={index} variant="secondary" className="bg-info text-white capitalize">
                                                {feature}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}
