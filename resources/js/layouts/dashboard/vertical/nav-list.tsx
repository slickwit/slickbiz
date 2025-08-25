import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { TMenuItem } from '../configs/navigations';
import NavItem from './nav-item';
// import { useActiveLink } from "@/hooks";
// import { usePathname } from "next/navigation";

// ----------------------------------------------------------------------
interface IProps {
    item: TMenuItem;
    depth: number;
}

export default function NavList({ item, depth }: IProps) {
    // const active = useActiveLink(item.path, !!item.children);
    const active = false;

    if (item.children) {
        return (
            <Collapsible defaultOpen={active}>
                <NavItem {...item} depth={depth} active={active} />
                <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden pl-3 transition-all">
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
