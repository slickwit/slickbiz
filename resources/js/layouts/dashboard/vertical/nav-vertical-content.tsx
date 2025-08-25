import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { INavData } from '../configs/navigations';
import NavSectionVertical from './nav-section-vertical';
// import NavAccount from "@/layouts/common/nav-account";

// ----------------------------------------------------------------------

interface NavVerticalContentProps extends HTMLAttributes<HTMLDivElement> {
    navData: INavData;
    noUser?: boolean;
}

export default function NavVerticalContent({ className, navData, ...props }: NavVerticalContentProps) {
    return (
        <div className={cn('h-full w-full', className)} {...props}>
            <ScrollArea className="flex h-full flex-col [&>div>div]:!block">
                {/* {!noUser && <NavAccount />} */}
                <NavSectionVertical navData={navData} />
                <div className="flex-grow" />
            </ScrollArea>
        </div>
    );
}
