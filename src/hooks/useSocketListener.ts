import { useEffect } from "react";
import { socket } from "@/lib/socket";

type Event = {
  event: string;
  listener: () => void;
}[];

const useSocketListener = (event: string | Event, listener?: () => void) => {
  useEffect(() => {
    if (typeof event === "string") {
      listener && socket.on(event, listener);
    } else {
      event.forEach(event => socket.on(event.event, event.listener));
    }

    return () => {
      if (typeof event === "string") {
        socket.off(event, listener);
      } else {
        event.forEach(event => socket.off(event.event, event.listener));
      }
    };
  }, []);
};

export default useSocketListener;
