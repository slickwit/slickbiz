import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { INavData } from '../configs/navigations';
import NavList from './nav-list';

// ----------------------------------------------------------------------

interface IProps {
    navData: INavData;
}

const NavSectionVertial = ({ navData }: IProps) => {
    return (
        <nav className="flex flex-col">
            {navData.map(({ items, subheader }, index) => (
                <NavSectionGroup key={index} items={items} subheader={subheader} />
            ))}
        </nav>
    );
};

interface IGroupProps {
    items: INavData[number]['items'];
    subheader: INavData[number]['subheader'];
}

function NavSectionGroup({ items, subheader }: IGroupProps) {
    return (
        <div className="flex flex-col px-4">
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="w-full [&[data-state=closed]>.nav-subheader]:after:ml-2 [&[data-state=closed]>.nav-subheader]:after:content-['•_•_•']">
                    <li className="nav-subheader box-border inline-flex w-full cursor-pointer pt-4 pr-2 pb-4 pl-3 text-xs leading-normal font-bold text-gray-400 uppercase transition-colors select-none hover:text-foreground">
                        {subheader}
                    </li>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex w-full">
                    <div className="w-full">
                        {items.map((item) => (
                            <NavList key={item.title} item={item} depth={1} />
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}

export default NavSectionVertial;
