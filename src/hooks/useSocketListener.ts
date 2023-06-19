import { useEffect } from "react";
import { socket } from "@/lib/socket";

const useSocketListener = (event: string, listener: () => void) => {
  useEffect(() => {
    socket.on(event, listener);

    return () => {
      socket.off(event, listener);
    };
  }, []);
};

export default useSocketListener;
