import { useEffect, useState } from "react";

import { useRoomContext } from "@/context/RoomContext";
import { fetcher } from "@/lib/fetcher";

const useUnreadMessages = (roomId: string, roomUpdatedAt: string) => {
  const { activeRoom } = useRoomContext();
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    fetcher(`/api/rooms/${roomId}/messages/unread`).then(res => {
      setUnreadMessages(res.data?.unreadMessages ?? 0);
    });
  }, [roomUpdatedAt, activeRoom?._id]);

  return unreadMessages;
};

export default useUnreadMessages;
