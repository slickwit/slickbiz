import { AvatarFallback, AvatarImage, Avatar as AvatarUI } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

// ----------------------------------------------------------------------

interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
    alt: string;
    src: string;
    width?: number;
    height?: number;
    name?: string;
}

export default function Avatar({ src, alt, name, className, width = 32, height = 32, ...props }: AvatarProps) {
    let fallback = '';

    if (name) {
        const splittedString = name.split(' ');
        fallback = `${splittedString.at(0)?.charAt(0)}${splittedString.at(-1)?.charAt(0)}`;
    } else {
        fallback = `${alt.charAt(0)}${alt.charAt(alt.length - 1)}`;
    }

    return (
        <AvatarUI
            className={cn(
                'h-8 w-8 shadow-[rgba(0,_0,_0,_0)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.1)_0px_1px_3px_0px]',
                className,
            )}
            {...props}
        >
            <AvatarImage src={src} asChild>
                <img src={src} alt={alt} width={width} height={height} />
            </AvatarImage>
            <AvatarFallback className={cn('bg-primary/80 p-3 text-white uppercase')}>{fallback}</AvatarFallback>
        </AvatarUI>
    );
}
