import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/navigation';

export interface useSearchValue {
  params: URLSearchParams;
  handleClear: (exclude?: Record<string, any>) => void;
  handleRemove: (name: string) => void;
  handleSearchObj: (val: Record<string, any>) => void;
  handleSearch: (name: string) => (value: string) => void;
}

export const useSearch = (): useSearchValue => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const router = useRouter();
  const queryObject = Object.fromEntries(params.entries());
  const handleSearch = (name: string) => (value: string) => {
    if (value === 'all') {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    router.replace({ pathname: pathname, query: queryObject });
  };

  const handleSearchObj = (val: Record<string, any>) => {
    for (const key in val) {
      if (val.hasOwnProperty(key) && val[key]) {
        params.set(key, val[key]);
      } else {
        params.delete(key);
      }
    }
    router.replace({ pathname: pathname, query: queryObject });
  };

  const handleClear = (exclude?: Record<string, any>) => {
    router.replace({ pathname: pathname, query: exclude });
  };

  const handleRemove = (name: string) => {
    params.delete(name);
    router.replace({ pathname: pathname, query: queryObject });
  };

  return { params, handleSearch, handleClear, handleRemove, handleSearchObj };
};
