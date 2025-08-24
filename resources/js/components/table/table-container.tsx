import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { Card, CardContent } from '../ui/card';
import type { DensityState } from './features/density';

// ----------------------------------------------------------------------

interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
    dense: DensityState;
}

export default function TableContainer({ children, className, dense }: TableContainerProps) {
    return (
        <Card className={cn('py-0', className)}>
            <CardContent data-dense={dense} className={cn('group p-0 [&_th]:font-medium')}>
                {children}
            </CardContent>
        </Card>
    );
}
