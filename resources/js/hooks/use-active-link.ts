import { TMenuItem } from '@/config/routes/navigation';
import { usePage } from '@inertiajs/react';

// ----------------------------------------------------------------------

export function useActiveLink() {
    const { url } = usePage();

    /**
     * Extract the pathname from a URL (ignoring query parameters).
     */
    const getPathname = (fullUrl: string): string => {
        try {
            const urlObj = new URL(fullUrl, window.location.origin);
            return urlObj.pathname;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_e: unknown) {
            return fullUrl.split('?')[0];
        }
    };

    /**
     * Recursively check if a menu item or any of its children is active.
     */
    const isActive = (item: TMenuItem): boolean => {
        const itemPath = item.path ? getPathname(item.path) : null;
        const currentPath = getPathname(url);
        if (itemPath && currentPath === itemPath) return true;

        // Recursively check if any child is active
        if (item.children) {
            return item.children.some((child) => isActive(child));
        }

        return false;
    };

    return {
        active: isActive,
    };
}
