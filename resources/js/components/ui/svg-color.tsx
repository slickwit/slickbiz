import { cn } from '@/lib/utils';
import { TClassName } from '@/types';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

interface ISvgColorProps {
    className?: TClassName;
    src: string;
}

export default forwardRef<HTMLSpanElement, ISvgColorProps>(function SvgColor({ className, src }, ref) {
    return (
        <span
            style={{
                mask: `url(${src}) no-repeat center / contain`,
                WebkitMask: `url(${src}) no-repeat center / contain`,
            }}
            ref={ref}
            className={cn('inline-block h-6 w-6 bg-current', className)}
        />
    );
});
