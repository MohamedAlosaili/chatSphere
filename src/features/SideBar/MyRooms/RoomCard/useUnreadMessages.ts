import { useEffect, useState } from "react";

import { fetcher } from "@/lib/fetcher";

const useUnreadMessages = (roomId: string) => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  useEffect(() => {
    fetcher(`/api/rooms/${roomId}/messages/unread`).then(res => {
      setUnreadMessages(res.data?.unreadMessages ?? 0);
    });
  }, []);

  return unreadMessages;
};

export default useUnreadMessages;
