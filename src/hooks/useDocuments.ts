import { useEffect, useState, useRef } from "react";
import { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

// Types
import { FetcherResponse, fetcher } from "@/lib/fetcher";
import { MutableRefObject } from "react";

interface Options extends AxiosRequestConfig {
  errorMessage?: string;
  limitToLast?: boolean;
}

type UseDocuments<T> = [T[], boolean, (nextPage?: boolean) => void, number];

const useDocuments = <T>(
  url: string,
  { errorMessage, limitToLast, ...options }: Options = {}
): UseDocuments<T> => {
  const response: MutableRefObject<FetcherResponse<T[]> | undefined> = useRef();
  const [result, setResult] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async (page: number = 1) => {
    setLoading(true);

    const prefix = url.includes("?") ? "&" : "?";
    const URL = url.replace(/page=\d+/, "") + `${prefix}page=${page}`;

    const res = await fetcher<T[]>(URL, options);

    setLoading(false);
    if (res.success && res.data) {
      if (page > 1) {
        if (limitToLast) {
          setResult(prevResult => [...res.data, ...prevResult]);
        } else {
          setResult(prevResult => [...prevResult, ...res.data]);
        }
      } else {
        setResult(res.data);
      }

      response.current = res;
    } else {
      errorMessage && toast.error(errorMessage);
    }
  };

  const update = (nextPage?: boolean) => {
    const res = response.current;

    let page = 1;
    if (nextPage && res && res.pagination?.next) {
      page = res.pagination.page + 1;
    }

    if (nextPage && !(result.length < (response.current?.total ?? 0))) return;

    fetchDocuments(page);
  };

  return [result, loading, update, response.current?.total ?? 0];
};

export default useDocuments;
