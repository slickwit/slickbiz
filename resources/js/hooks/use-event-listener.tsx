"use client";
import { useRef, useEffect, useLayoutEffect } from "react";

// ----------------------------------------------------------------------

type UseEventListenerOptions = boolean | AddEventListenerOptions;

type ElementRef<T extends EventTarget = HTMLElement> = { current: T | null };

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useEventListener<K extends keyof HTMLElementEventMap>(
	eventName: K,
	handler: (event: HTMLElementEventMap[K]) => void,
	element?: ElementRef,
	options?: UseEventListenerOptions,
) {
	const savedHandler = useRef<typeof handler>(handler);

	useIsomorphicLayoutEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const targetElement = element?.current || window;
		if (!(targetElement && targetElement.addEventListener)) {
			return;
		}

		const eventListener = (event: Event) => savedHandler.current(event as HTMLElementEventMap[K]);

		targetElement.addEventListener(eventName, eventListener, options);

		return () => {
			targetElement.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element, options]);
}
