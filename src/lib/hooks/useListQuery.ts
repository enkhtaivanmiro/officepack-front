'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import axios from '@/lib/axios';

type ErrorType = any;

export interface UseListQueryProps {
  uri: string;
  enabled?: boolean;
  mode?: 'simple' | 'infinite';
  params?: Record<string, any>;
}

export interface UseListQueryValue<T> {
  loading: boolean;
  error?: ErrorType;
  current: number;
  hasNextPage: boolean;
  data: T[]; // Flattened for consistency
  fetchData: (params?: Record<string, any>) => Promise<any>;
  fetchMore: (params?: Record<string, any>) => Promise<any>;
}

interface SimpleListResponse<T> {
  page: number;
  count: number;
  data: T[];
}

interface InfiniteListResponse<T> {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  list: T[];
}

export const useListQuery = <T>({
  uri,
  enabled = true,
  mode = 'simple',
  params = { page: 1, pageSize: 12 },
}: UseListQueryProps): UseListQueryValue<T> => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<ErrorType>();

  const hasNextPage = data.length < total;

  useEffect(() => {
    if (!loading && enabled) {
      fetchData(params);
    }
  }, [searchParams, enabled]);

  const makeRequest = async (queryParams?: Record<string, any>) => {
    const dto = { ...(queryParams || params) };
    try {
      const response = await axios.get(uri, { params: dto });
      return response;
    } catch (e) {
      setError(e);
      return e;
    } finally {
      setLoading(false);
    }
  };

  const fetchData = useCallback(
    async (queryParams?: Record<string, any>) => {
      setLoading(true);
      const res = await makeRequest(queryParams);

      if (!res) return res;

      if (mode === 'infinite') {
        const r = res as InfiniteListResponse<T>;
        setData(r.list || []);
        setCurrent(r.currentPage || 1);
        setTotal(r.totalCount || 0);
      } else {
        const r = res as SimpleListResponse<T>;
        setData(r.data || []);
        setCurrent(r.page || 1);
        setTotal(r.count || 0);
      }

      return res;
    },
    [mode],
  );

  const fetchMore = useCallback(
    async (queryParams?: Record<string, any>) => {
      setLoading(true);
      const nextParams = {
        ...params,
        page: parseInt(`${current}`, 10) + 1,
        ...(queryParams || {}),
      };
      const res = await makeRequest(nextParams);

      if (!res) return res;

      if (mode === 'infinite') {
        const r = res as InfiniteListResponse<T>;
        setData((prev) => [...prev, ...(r.list || [])]);
        setCurrent(r.currentPage || current + 1);
        setTotal(r.totalCount || total);
      } else {
        const r = res as SimpleListResponse<T>;
        setData((prev) => [...prev, ...(r.data || [])]);
        setCurrent(r.page || current + 1);
        setTotal(r.count || total);
      }

      return res;
    },
    [mode, current],
  );

  return {
    data,
    error,
    loading,
    fetchData,
    fetchMore,
    hasNextPage,
    current: parseInt(`${current}`, 10),
  };
};
