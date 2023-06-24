import { useState } from "react";
import { toast } from "react-toastify";

import { useRoomContext } from "@/context/RoomContext";
import { useUserContext } from "@/context/UserContext";
import { fetcher } from "@/lib/fetcher";
import { socket } from "@/lib/socket";

// Types
import { TRoom } from "@/types";

const useLeaveRoom = (room: TRoom) => {
  const { user } = useUserContext();
  const { resetRoom } = useRoomContext();
  const [loading, setLoading] = useState(false);

  const leaveRoom = async () => {
    setLoading(true);
    const res = await fetcher(`/api/rooms/${room._id}/members/left`, {
      method: "DELETE",
    });

    setLoading(false);
    if (res.success) {
      resetRoom();
      socket.emit("update messages", room._id, user?._id);
      toast.success(`Successfully left from ${room.name ?? "the room"}`);
    } else {
      toast.error("Failed to leave the room, try again later.");
    }
  };

  return { leaveRoom, loading };
};

export default useLeaveRoom;
