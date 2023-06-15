import { FetcherResponse } from "@/lib/fetcher";
import { toast } from "react-toastify";

const useAsync = (setLoading: (v: boolean) => void) => {
  const sendRquest = async <TData = any>(
    request: Promise<FetcherResponse<TData>>[],
    successMessage: string,
    errorMessage: string = "Failed to fetch data"
  ) => {
    try {
      const results = await Promise.all(request);

      if (results.every(res => res.success)) {
        toast.success(successMessage);
      } else {
        return toast.error(errorMessage);
      }

      return results;
    } catch (err) {
      setLoading(false);

      let errMessage = errorMessage;
      if (err instanceof Error) errMessage = err.message;

      toast.error(errMessage);
    }
  };

  return sendRquest;
};

export default useAsync;
