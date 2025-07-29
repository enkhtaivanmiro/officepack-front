'use client';
import { useEffect, useState } from 'react';

export const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // @ts-ignore
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (
      // @ts-ignore
      (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) ||
      (/Macintosh/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome|Chromium/.test(userAgent))
    ) {
      setIsIOS(true);
    }
  }, []);

  return isIOS;
};
