'use client';
import { useState } from 'react';
import { AxiosResponse } from 'axios';

import axios from '@/lib/axios';
import { ErrorType } from '@/schema';

export interface UseMutationProps {
  uri: string;
  method?: 'post' | 'put' | 'delete';
}

export interface UseMutationValue {
  error?: ErrorType;
  loading: boolean;
  request: (data: any, requestUri?: string) => Promise<AxiosResponse<string, any>>;
}

export const useMutation = ({ uri, method = 'post' }: UseMutationProps): UseMutationValue => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const request = (data: any, requestUri?: string): Promise<AxiosResponse<any, any>> => {
    setLoading(true);
    return axios
      .request({
        url: requestUri || uri,
        data,
        method,
      })
      .then((res: any) => {
        setLoading(false);

        return res;
      })
      .catch((e) => {
        if (e?.statusCode === 401) {
          window.location.reload();
        }
        setLoading(false);
        setError(e);
        return Promise.reject(e);
      });
  };

  return { loading, error, request };
};
