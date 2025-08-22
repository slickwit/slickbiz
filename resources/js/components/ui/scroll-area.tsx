import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface IScrollArea extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
    orientation?: 'horizontal' | 'vertical';
}
const ScrollArea = React.forwardRef<React.ComponentRef<typeof ScrollAreaPrimitive.Root>, IScrollArea>(
    ({ className, children, orientation = 'vertical', ...props }, ref) => (
        <ScrollAreaPrimitive.Root ref={ref} data-slot="scroll-area" className={cn('relative', className)} {...props}>
            <ScrollAreaPrimitive.Viewport
                data-slot="scroll-area-viewport"
                className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
            >
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar orientation={orientation} />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    ),
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

function ScrollBar({ className, orientation = 'vertical', ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
    return (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            data-slot="scroll-area-scrollbar"
            orientation={orientation}
            className={cn(
                'flex touch-none p-px transition-colors select-none',
                orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent',
                orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
                className,
            )}
            {...props}
        >
            <ScrollAreaPrimitive.ScrollAreaThumb data-slot="scroll-area-thumb" className="relative flex-1 rounded-full bg-border" />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
}

export { ScrollArea, ScrollBar };
