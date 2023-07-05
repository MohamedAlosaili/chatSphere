import axios, { AxiosRequestConfig, AxiosError } from "axios";

export interface FetcherResponse<TData = any> {
  success: boolean;
  data: TData;
  message?: string;
  error?: string;
  pagination?: {
    next: boolean;
    prev: boolean;
    limit: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  total?: number;
}

export const fetcher = async <TData = any>(
  url: string,
  options?: AxiosRequestConfig
) => {
  try {
    if (!url?.trim?.() || typeof url !== "string") {
      throw new Error("Failed to fetch resource");
    }

    const { data } = await axios<FetcherResponse<TData>>(url, options);

    return { ...data };
  } catch (err) {
    let error = "Internal Server Error";

    if (
      err instanceof AxiosError &&
      (err.response?.data.error || err.response?.statusText)
    ) {
      error = err.response?.data.error ?? err.response?.statusText;
    } else if (err instanceof Error && err.message) {
      error = err.message;
    }

    return {
      success: false,
      data: null,
      error,
    };
  }
};
