import { useEffect } from "react";
import { toast } from "react-toastify";

const LoadingSpinner = () => {
  useEffect(() => {
    const toastId = toast.loading("Loading...");

    return () => {
      toast.dismiss(toastId);
    };
  });

  return null;
};

export default LoadingSpinner;
