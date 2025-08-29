import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useActiveLink } from '@/hooks';
import { TMenuItem } from '../configs/navigations';
import NavItem from './nav-item';
// import { usePathname } from "next/navigation";

// ----------------------------------------------------------------------
interface IProps {
    item: TMenuItem;
    depth: number;
}

export default function NavList({ item, depth }: IProps) {
    const active = useActiveLink(item.name ?? item.children);

    if (item.children) {
        return (
            <Collapsible defaultOpen={active}>
                <NavItem {...item} depth={depth} active={active} />
                <CollapsibleContent className="overflow-hidden pl-3 transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <NavSubList item={item.children} depth={depth} />
                </CollapsibleContent>
            </Collapsible>
        );
    }

    return (
        <>
            <NavItem {...item} depth={depth} active={active} />
        </>
    );
}

// ----------------------------------------------------------------------

function NavSubList({ item, depth }: { item: TMenuItem[]; depth: number }) {
    return (
        <>
            {item.map((list) => (
                <NavList item={list} key={list.title} depth={depth + 1} />
            ))}
        </>
    );
}
