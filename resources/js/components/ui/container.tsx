import { cn } from '@/lib/utils';
import { TClassName } from '@/types';
import { type ReactNode } from 'react';
// import { useSettings } from "../settings/store";
// ----------------------------------------------------------------------

interface IProps {
    children?: ReactNode;
    className?: TClassName;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export default function Container({ children, className, maxWidth = '2xl' }: IProps) {
    // const stretch = useSettings((state) => state.themeStretch);
    const stretch = false;

    return (
        <div
            className={cn(
                'mx-auto box-border block w-full max-w-full px-4 sm:px-6',
                {
                    '2xl:max-w-screen-2xl': maxWidth === '2xl' && !stretch,
                    'xl:max-w-screen-xl': maxWidth === 'xl' && !stretch,
                    'lg:max-w-screen-lg': maxWidth === 'lg' && !stretch,
                    'md:max-w-screen-md': maxWidth === 'md' && !stretch,
                    'sm:max-w-screen-sm': maxWidth === 'sm' && !stretch,
                },
                className,
            )}
        >
            {children}
        </div>
    );
}
