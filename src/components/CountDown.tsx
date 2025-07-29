'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { timezoneDate } from '@/lib/utils/helper';

export interface CountDownCompProps {
  d: number;
  h: number;
  m: number;
  s: number;
  isEnd: boolean;
  reCount: () => void;
  date?: string | number | Date;
  leadingZero: (val: number) => string | number;
}

export const CountDown = ({
  date,
  Comp,
  refresh,
  duration,
  callback,
}: {
  duration?: number;
  refresh?: () => void;
  callback?: () => void;
  date?: string | number | Date;
  Comp: (props: CountDownCompProps) => React.ReactElement;
}) => {
  // @ts-ignore
  const timerRef = useRef<any>();

  // Calculate the initial counts
  const calculateCounts = useCallback(() => {
    if (duration) return duration;
    if (!date) return 0;
    return Math.floor((new Date(date).getTime() - timezoneDate().toDate().getTime()) / 1000);
  }, [date, duration]);

  const counterRef = useRef(calculateCounts());
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  // Recalculate isEnd whenever date or duration changes
  const isEnd = useMemo(() => calculateCounts() <= 0, [calculateCounts]);

  const MemoizedComp = useMemo(() => Comp, [Comp]);
  const leadingZero = useCallback((count: number) => (count <= 9 ? `0${count}` : count), []);

  // Update the timer
  const updateTime = useCallback(() => {
    const days = Math.floor(counterRef.current / 86400);
    const hours = Math.floor((counterRef.current - days * 86400) / 3600);
    const minutes = Math.floor((counterRef.current - hours * 3600 - days * 86400) / 60);
    const seconds = counterRef.current - days * 86400 - hours * 3600 - minutes * 60;
    setTime({ d: days, h: hours, m: minutes, s: seconds });

    if (counterRef.current === 0) {
      clearInterval(timerRef.current);
      callback?.();
      return;
    }
    counterRef.current--;

    if (counterRef.current < 0) {
      refresh?.();
      clearInterval(timerRef.current);
    }
  }, [callback, refresh]);

  // Reset and restart the timer
  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    counterRef.current = calculateCounts();

    if (counterRef.current > 0) {
      updateTime(); // Update immediately
      timerRef.current = setInterval(updateTime, 1000);
    } else {
      setTime({ d: 0, h: 0, m: 0, s: 0 });
      callback?.();
    }
  }, [calculateCounts, updateTime, callback]);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearInterval(timerRef.current);
      } else {
        // If duration is provided, just resume the timer without recalculating
        if (duration !== undefined && duration !== null) {
          timerRef.current = setInterval(updateTime, 1000);
        } else {
          // Only recalculate time if we're using date-based countdown
          resetTimer();
        }
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearInterval(timerRef.current);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resetTimer]);

  // Initialize timer on mount and when date or duration changes
  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [date, duration, resetTimer]);

  const reCount = () => {
    resetTimer();
  };

  return <MemoizedComp {...time} leadingZero={leadingZero} reCount={reCount} isEnd={isEnd} date={date} />;
};
