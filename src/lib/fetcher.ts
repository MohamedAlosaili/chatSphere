import axios, { AxiosRequestConfig, AxiosError } from "axios";

export interface FetcherResponse<TData = any> {
  success: boolean;
  data: TData;
  message?: string;
  error?: string;
}

const response = <TData>(
  success: boolean,
  data: TData,
  message: string = ""
): FetcherResponse<TData> => ({
  success,
  data,
  ...(success ? { message } : { error: message }),
});

export const fetcher = async <TData = any>(
  url: string,
  options?: AxiosRequestConfig
) => {
  try {
    const res = await axios<{
      success: boolean;
      data: TData;
      message?: string;
      error?: string;
    }>(url, options);

    return response<TData>(res.data.success, res.data.data, res.data.message);
  } catch (err) {
    if (err instanceof AxiosError) {
      return response<null>(
        false,
        null,
        (err.response?.data.error ?? err.response?.statusText) as string
      );
    } else if (err instanceof Error) {
      return response<null>(false, null, err.message);
    } else {
      return response<null>(false, null, "Internal Server Error");
    }
  }
};
