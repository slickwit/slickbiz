import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ----------------------------------------------------------------------

interface EmptyContent {
    title?: string;
    imgUrl?: string;
    action?: ReactNode;
    description?: string;
    filled?: boolean;
    className?: string;
}

export function EmptyContent({ title = 'No Data', imgUrl, action, description, className, filled = true }: EmptyContent) {
    return (
        <div
            className={cn(
                'flex h-96 flex-grow flex-col items-center justify-center rounded-xl border-dashed border-gray-600/80 px-6',
                className,
                filled && 'bg-foreground/5',
            )}
        >
            <img
                alt="empty content"
                src={imgUrl ?? '/assets/icons/empty/ic_content.svg'}
                // width={imageProps?.width ?? isFilled ? undefined : 160}
                // height={imageProps?.height ?? isFilled ? undefined : 160}
            />

            {title && <span className="text-lg font-bold text-muted-foreground">{title}</span>}

            {description && <span className="text-sm font-medium text-gray-400">{description}</span>}

            {action && action}
        </div>
    );
}
