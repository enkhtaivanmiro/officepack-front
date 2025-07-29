'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const getDocHeight = () =>
  Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );

export interface ScrollListenerOptions {
  scrollTop?: number;
  scrollContainer?: string | HTMLDivElement;
}

export function useScrollListener(options?: ScrollListenerOptions) {
  const lastScrollTop = useRef<number>(0);
  const [navHide, setNavHide] = useState(false);
  const container = useMemo<HTMLDivElement | any>(() => {
    if (!options?.scrollContainer && typeof window !== 'undefined') return window;
    if (typeof options?.scrollContainer === 'string') document.getElementById(options.scrollContainer);
    return options?.scrollContainer;
  }, [options]);

  const handleScroll = () => {
    const st = container.scrollY;
    if (Math.abs(lastScrollTop.current - st) <= (options?.scrollTop || 50)) return;
    if (st > lastScrollTop.current && st > 60) {
      setNavHide(true);
    } else if (st < getDocHeight()) {
      setNavHide(false);
    }
    lastScrollTop.current = st;
  };

  useEffect(() => {
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { navHide };
}
