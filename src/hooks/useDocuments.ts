import { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

import { FetcherResponse, fetcher } from "@/lib/fetcher";

type UseDocuments<T> = [
  T[] | undefined,
  boolean,
  (nextPage?: boolean) => void,
  number | undefined
];

const useDocuments = <T>(
  url: string,
  options?: AxiosRequestConfig,
  errorMessage?: string
): UseDocuments<T> => {
  const [response, setResponse] = useState<FetcherResponse<T[]> | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async (nextPage?: boolean) => {
    setLoading(true);

    let URL = url;
    if (nextPage && response?.pagination?.next) {
      URL += `?page=${response.pagination.page + 1}`;
    }

    const res = await fetcher<T[]>(URL, options);

    setLoading(false);
    if (res.success && res.data) {
      setResponse(res);
    } else {
      errorMessage && toast.error(errorMessage);
    }
  };

  const update = (nextPage?: boolean) => {
    fetchDocuments(nextPage);
  };

  return [response?.data, loading, update, response?.total];
};

export default useDocuments;
