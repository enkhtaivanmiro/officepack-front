'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NProgressBase from 'nprogress';

import { usePathname } from '@/i18n/navigation';

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

function containsSpecialCharacters(inputString: string) {
  // Test if the inputString contains any special characters
  return /[@#$!%*?&]/.test(inputString);
}

const NProgress = React.memo(
  () => {
    const styles = (
      <style>
        {`
          #nprogress {
            pointer-events: none;
          }
          #nprogress .bar {
            background: var(--gradient-bg);
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
          }
        `}
      </style>
    );

    NProgressBase.configure({ showSpinner: true });

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
      NProgressBase.done();
    }, [pathname, searchParams]);

    useEffect(() => {
      let timer: NodeJS.Timeout;

      const startProgress = () => {
        timer = setTimeout(NProgressBase.start, 0);
      };

      const stopProgress = () => {
        clearTimeout(timer);
        NProgressBase.done();
      };

      const handleAnchorClick = (event: MouseEvent) => {
        const anchorElement = event.currentTarget as HTMLAnchorElement;

        // Skip anchors with target="_blank"
        if (anchorElement.target === '_blank') return;

        const targetUrl = new URL(anchorElement.href);
        const currentUrl = new URL(location.href);

        if (isSameURL(targetUrl, currentUrl)) return;
        if (targetUrl?.href === currentUrl?.href) return;
        if (containsSpecialCharacters(targetUrl?.href)) return;

        startProgress();
      };

      const handleMutation: MutationCallback = () => {
        const anchorElements = document.querySelectorAll('a');
        // Skip anchors with target="_blank" and anchors without href
        const validAnchorELes = Array.from(anchorElements).filter(
          (anchor) => anchor.href && anchor.target !== '_blank' && !anchor.classList.contains('ignore'),
        );
        validAnchorELes.forEach((anchor) => anchor.addEventListener('click', handleAnchorClick));
      };

      const mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(document, { childList: true, subtree: true });

      window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, argArray: PushStateInput) => {
          stopProgress();
          return target.apply(thisArg, argArray);
        },
      });
    }, []);

    return styles;
  },
  () => true,
);

export default NProgress;

export function isSameURL(target: URL, current: URL) {
  const cleanTarget = `${target.protocol}//${target.host}${target.pathname}`;
  const cleanCurrent = `${current.protocol}//${current.host}${current.pathname}`;

  return cleanTarget === cleanCurrent;
}
