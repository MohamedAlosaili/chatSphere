import { useEffect, useState } from "react";

import { fetcher } from "@/lib/fetcher";

const useUnreadMessages = (roomId: string, key: string) => {
  const [unreadMessages, setUnreadMessages] = useState(0);

  // TODO: update useEffect here - find a better way
  useEffect(() => {
    fetcher(`/api/rooms/${roomId}/messages/unread`).then(res => {
      setUnreadMessages(res.data?.unreadMessages ?? 0);
    });
  }, [key]);

  return unreadMessages;
};

export default useUnreadMessages;
