import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { buttonVariants } from './variants';

// ----------------------------------------------------------------------

export interface LinkButtonProps extends Omit<React.LinkHTMLAttributes<HTMLAnchorElement>, 'color'>, VariantProps<typeof buttonVariants> {
    ring?: boolean;
    variant?: 'destructive' | 'secondary' | 'link' | 'ghost' | 'soft' | 'filled' | 'outline';
    color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
    size?: 'default' | 'sm' | 'md' | 'lg' | 'icon';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    href: string;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
    ({ className, variant, color, size, ring = false, startIcon, endIcon, children, href, ...props }, ref) => {
        return (
            <a
                data-start-icon={!!startIcon}
                data-end-icon={!!endIcon}
                className={cn(buttonVariants({ variant, size, color, className }), {
                    'ring-common ring-offset-0 focus-visible:ring-1': ring,
                })}
                href={href}
                ref={ref}
                {...props}
            >
                <>
                    {!!startIcon && <span className="mr-1">{startIcon}</span>}
                    {children}
                    {!!endIcon && <span className="ml-1">{endIcon}</span>}
                </>
            </a>
        );
    },
);
LinkButton.displayName = 'Button';

export { LinkButton };
