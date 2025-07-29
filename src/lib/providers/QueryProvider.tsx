'use client';
import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function QueryProvider({ children }: { children: React.ReactNode }) {
  const { current } = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 2,
          refetchOnWindowFocus: false,
        },
      },
    }),
  );

  return <QueryClientProvider client={current}>{children}</QueryClientProvider>;
}
export default QueryProvider;
