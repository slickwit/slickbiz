import { useEventListener } from '@/hooks';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ComponentProps, type ComponentPropsWithoutRef, type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';

// ----------------------------------------------------------------------

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type TOption = {
    value: string;
    label: ReactNode;
    triggerChild?: boolean;
    props?: Omit<ComponentProps<typeof TabsTrigger>, 'value'>;
};

interface CustomScrollableTabsProps<T extends TOption[]> extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
    options: T;
    value: string;
    onChange?: (value: T[number]['value']) => void;
    tabListProps?: ComponentPropsWithoutRef<typeof TabsList>;
    className?: string;
}

export const CustomScrollableTabs = <TOptions extends TOption[]>({
    children,
    options,
    value,
    onChange,
    tabListProps,
    className,
}: CustomScrollableTabsProps<TOptions>) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [parentWidth, setParentWidth] = useState(0);
    const [showLeftBtn, setShowLeftBtn] = useState(false);
    const [showRightBtn, setShowRightBtn] = useState(false);

    useEventListener(
        'resize',
        () => {
            const parentWidth = containerRef.current?.parentElement?.offsetWidth || 1;
            setParentWidth(parentWidth);
        },
        containerRef,
    );

    const handleChange = (value: string) => {
        onChange?.(value as TOptions[number]['value']);
    };

    const handleBtnVisibility = (scrollLeft: number, prntWidth: number) => {
        setShowLeftBtn(scrollLeft > 0);
        const isRightButtonDisabled = (ref.current?.scrollWidth || 0) <= prntWidth + (scrollLeft || 0);
        setShowRightBtn(!isRightButtonDisabled);
    };

    useIsomorphicLayoutEffect(() => {
        if (ref.current && containerRef.current) {
            const parentWidth = containerRef.current.parentElement?.offsetWidth || 1;
            setParentWidth(parentWidth);
            handleBtnVisibility(ref.current.scrollLeft, parentWidth);
        }
    }, [ref.current, containerRef.current]);

    const moveTo = (to: number) => {
        if (ref.current) {
            // Framer Motion alternative to GSAP scrollTo
            ref.current.scrollTo({
                left: to,
                behavior: 'smooth',
            });
        }
    };

    const handleScrollRight = () => {
        if (ref.current) {
            const newScrollLeft = ref.current.scrollLeft + parentWidth;
            moveTo(newScrollLeft);

            // Use requestAnimationFrame for better timing with smooth scroll
            requestAnimationFrame(() => {
                handleBtnVisibility(newScrollLeft, parentWidth);
            });
        }
    };

    const handleScrollLeft = () => {
        if (ref.current) {
            const newScrollLeft = ref.current.scrollLeft - parentWidth;
            moveTo(newScrollLeft);

            requestAnimationFrame(() => {
                handleBtnVisibility(newScrollLeft, parentWidth);
            });
        }
    };

    // Handle scroll events to update button visibility
    const handleScroll = () => {
        if (ref.current) {
            handleBtnVisibility(ref.current.scrollLeft, parentWidth);
        }
    };

    return (
        <div ref={containerRef} className={cn('relative z-20 flex items-center overflow-hidden bg-card', className)}>
            <AnimatePresence>
                {showLeftBtn && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleScrollLeft}
                        className="inline-flex w-5 items-center justify-center bg-card text-muted-foreground"
                    >
                        <ChevronLeft width={18} height={18} />
                    </motion.button>
                )}
            </AnimatePresence>

            <Tabs
                ref={ref}
                className="scrollbar-none flex items-center overflow-x-auto scroll-smooth transition-all"
                value={value}
                onValueChange={onChange ? handleChange : undefined}
                onScroll={handleScroll}
            >
                <TabsList {...tabListProps} className={cn('h-full space-x-4 bg-transparent p-0', tabListProps?.className)}>
                    {options.map(({ triggerChild = false, props = {}, ...option }) => {
                        return (
                            <TabsTrigger
                                className="relative h-12 cursor-pointer space-x-2 px-1 before:absolute before:bottom-0 before:h-[0.1rem] before:w-0 before:bg-common before:transition-all before:duration-150 before:content-[''] data-[state=active]:bg-transparent data-[state=active]:text-common data-[state=active]:shadow-none data-[state=active]:before:w-full"
                                {...props}
                                key={option.value}
                                value={option.value}
                                asChild={triggerChild}
                            >
                                {option.label}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                <TabsContent value={value}>{children}</TabsContent>
            </Tabs>

            <AnimatePresence>
                {showRightBtn && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleScrollRight}
                        className="inline-flex w-5 items-center justify-center bg-background text-muted-foreground"
                    >
                        <ChevronRight width={18} height={18} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
