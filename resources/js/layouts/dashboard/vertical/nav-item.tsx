import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronRightIcon } from 'lucide-react';
import { TMenuItem } from '../configs/navigations';

// ----------------------------------------------------------------------

type TProps = {
    depth: number;
    active: boolean;
} & TMenuItem;

export default function NavItem(props: TProps) {
    const { title, path = '#', icon, info, caption, disabled, children, depth, active } = props;

    const isChild = depth !== 1;

    if (children) {
        return (
            <CollapsibleTrigger
                disabled={disabled}
                aria-disabled={disabled}
                className={cn(
                    buttonVariants({ variant: 'ghost', size: isChild ? 'sm' : 'default' }),
                    'mb-1 flex w-full cursor-pointer justify-start text-foreground [&[data-state=open]>.arrow]:rotate-90 [&[data-state=open]>.arrow]:text-accent-foreground [&[data-state=open]>.icon]:text-accent-foreground [&[data-state=open]>.text>.title]:text-accent-foreground',
                    {
                        'cursor-default opacity-50': disabled,
                        'bg-primary/[0.08] hover:!bg-primary/[0.08] [&_*]:!text-primary': active && !isChild,
                    },
                )}
            >
                {!icon && (
                    <span
                        className={cn(
                            'icon mr-4 flex h-6 w-6 items-center justify-center transition-transform before:h-1 before:w-1 before:rounded-full before:bg-foreground before:content-[""]',
                            {
                                'scale-[2] transform before:bg-primary': active,
                            },
                        )}
                    />
                )}
                {!!icon && <span className="icon mr-4 h-6 w-6 min-w-6 text-start font-medium text-inherit">{icon}</span>}
                <span className="text min-w-0 flex-auto">
                    <span
                        className={cn('title block w-full overflow-hidden text-start text-sm font-medium text-ellipsis capitalize', {
                            'font-semibold text-accent-foreground': active,
                        })}
                    >
                        {title}
                    </span>
                    {caption && (
                        <span className="block w-full max-w-full overflow-hidden text-xs text-ellipsis whitespace-nowrap text-muted-foreground/60">
                            {caption}
                        </span>
                    )}
                </span>

                {info && <span>{info}</span>}

                <ChevronRightIcon
                    width={16}
                    className={cn('arrow transition-transform', {
                        'text-accent-foreground': active,
                    })}
                />
            </CollapsibleTrigger>
        );
    }

    const renderContent = (
        <div
            aria-disabled={disabled}
            className={cn(buttonVariants({ variant: 'ghost', size: isChild ? 'sm' : 'default' }), 'mb-1 flex w-full justify-start text-foreground', {
                'cursor-default opacity-50': disabled,
                '[&_*]:font-semibold': active,
                'bg-primary/[0.08] hover:!bg-primary/[0.08] [&_*]:!text-primary': active && !isChild,
                // '[&_*]:!text-accent-foreground': active && isChild,
            })}
        >
            {icon ? (
                <span className="icon mr-4 h-6 w-6 text-start font-medium text-inherit">{icon}</span>
            ) : (
                <span
                    className={cn(
                        'mr-4 flex h-6 w-6 items-center justify-center transition-transform before:h-1 before:w-1 before:rounded-full before:bg-foreground before:content-[""]',
                        {
                            'scale-[2] transform before:bg-primary': active,
                        },
                    )}
                />
            )}

            <span className="min-w-0 flex-auto">
                <span
                    className={cn('block w-full overflow-hidden text-start text-sm font-medium text-ellipsis capitalize', {
                        'text-primary': active,
                    })}
                >
                    {title}
                </span>
                {caption && (
                    <span className="block max-w-full overflow-hidden text-xs text-ellipsis whitespace-nowrap text-muted-foreground/60">
                        {caption}
                    </span>
                )}
            </span>

            {info && <span>{info}</span>}
        </div>
    );

    // External
    if (path.includes('http')) {
        return (
            <Link href={path} target="_blank" rel="noopener" className="mb-1">
                {renderContent}
            </Link>
        );
    }

    if (disabled) {
        return (
            <div className="mb-1" aria-disabled>
                {renderContent}
            </div>
        );
    }

    return (
        <Link href={path} className="mb-1" preserveScroll>
            {renderContent}
        </Link>
    );
}
