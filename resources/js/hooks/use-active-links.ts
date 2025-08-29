import { TMenuItem } from '@/layouts/dashboard/configs/navigations';

// ----------------------------------------------------------------------

export function useActiveLink(nav: TMenuItem[] | undefined | string) {
    const r = route();
    if (!nav) return false;

    if (typeof nav === 'string') return r.current(nav);

    if (nav.length) {
        return nav.some((n) => (n.name ? r.current(n.name) : false));
    }

    return false;
}
