import { cn } from '@/lib/utils';
import { forwardRef, type HTMLAttributes } from 'react';

// ----------------------------------------------------------------------

interface ISvgColorProps extends HTMLAttributes<HTMLSpanElement> {
    src: string;
}

const SvgColor = forwardRef<HTMLSpanElement, ISvgColorProps>(function SvgColor({ className, src, ...props }, ref) {
    return (
        <span
            style={{
                mask: `url(${src}) no-repeat center / contain`,
                WebkitMask: `url(${src}) no-repeat center / contain`,
            }}
            ref={ref}
            className={cn('inline-block h-6 w-6 bg-current', className)}
            {...props}
        />
    );
});

SvgColor.displayName = 'SvgColor';

export { SvgColor };
