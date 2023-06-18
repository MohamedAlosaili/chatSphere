import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

import { FetcherResponse, fetcher } from "@/lib/fetcher";

// Types
import { FormEvent, Dispatch, SetStateAction } from "react";
import { IndexSignature } from "@/types";

type Route = "users" | "rooms";

interface SearchType {
  value: string;
  setValue: Dispatch<SetStateAction<{ [key: string]: string }>>;
  loading: boolean;
  onSubmit: (e: FormEvent) => void;
}

type UseSearch<T> = [[T[], string | undefined, () => void, number], SearchType];

const useSearch = <T>(route: Route): UseSearch<T> => {
  const response = useRef<FetcherResponse<T[]>>();
  const submittedValue = useRef<string>();
  const [result, setResult] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<IndexSignature>({ search: "" });

  useEffect(() => {
    if (value.search.trim() === "") {
      submittedValue.current = "";
      setResult([]);
    }
  }, [value.search]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (value.search.trim() === "") {
      return toast.info("Enter a value before submitting");
    }

    fetchDocuments();
  };

  const nextPage = () => {
    const res = response.current;

    if (res && res.pagination?.next) {
      const page = res.pagination.page + 1;

      fetchDocuments(page);
    }
  };

  const fetchDocuments = async (page: number = 1) => {
    setLoading(true);
    submittedValue.current = value.search.trim();

    const res = await fetcher<T[]>(
      `/api/search/${route}?q=${value.search.trim()}&page=${page}`
    );

    setLoading(false);
    if (res.success && res.data) {
      if (page > 1) {
        setResult(prevResult => [...prevResult, ...res.data]);
      } else {
        setResult(res.data);
      }

      response.current = res;
    } else {
      toast.error("Something went wrong!");
    }
  };

  return [
    [result, submittedValue.current, nextPage, response.current?.total ?? 0],
    {
      value: value.search,
      setValue,
      loading,
      onSubmit,
    },
  ];
};

export default useSearch;
