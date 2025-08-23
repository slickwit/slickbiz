'use client';
import { useCallback, useState } from 'react';

// ----------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TParams = boolean | string | number | null | undefined | ((...args: any) => boolean);

export function useBoolean(defaultValue: TParams = false) {
    const [value, setValue] = useState(!!defaultValue);

    const onTrue = useCallback(() => {
        setValue(true);
    }, []);

    const onFalse = useCallback(() => {
        setValue(false);
    }, []);

    const onToggle = useCallback(() => {
        setValue((prev) => !prev);
    }, []);

    return {
        value,
        onTrue,
        onFalse,
        onToggle,
        setValue,
    };
}
