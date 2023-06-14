import axios, { AxiosRequestConfig, AxiosError } from "axios";

const response = <TData, TError = unknown>(
  success: boolean,
  data: TData,
  error?: TError,
  message?: string
) => ({
  success,
  data,
  ...(success ? { message } : { error }),
});

export const fetcher = async <TData = any>(
  url: string,
  options?: AxiosRequestConfig
) => {
  try {
    const res = await axios(url, options);

    return response<TData>(
      res.data?.success,
      res.data?.data,
      res.data?.message
    );
  } catch (err) {
    if (err instanceof AxiosError) {
      return response<null, string>(
        false,
        err.response?.data.data,
        err.response?.data.error ?? err.response?.statusText
      );
    } else if (err instanceof Error) {
      return response<null, string>(false, null, err.message);
    } else {
      return response<null, string>(false, null, "Internal Server Error");
    }
  }
};
