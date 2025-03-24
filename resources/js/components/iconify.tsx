import { Icon } from '@iconify/react';
import { ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react';

// ----------------------------------------------------------------------

const Iconify = forwardRef<ComponentRef<typeof Icon>, ComponentPropsWithoutRef<typeof Icon>>(({ ...props }, ref) => <Icon ref={ref} {...props} />);

Iconify.displayName = 'Iconify';

export { Iconify };
