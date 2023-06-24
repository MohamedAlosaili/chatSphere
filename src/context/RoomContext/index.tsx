import React, { PropsWithChildren, useContext, useState } from "react";

// Types
import { TRoom } from "@/types";
import { fetcher } from "@/lib/fetcher";

interface TRoomContext {
  activeRoom: TRoom | null;
  changeRoom: (room: TRoom) => void;
  updateRoom: () => void;
  resetRoom: () => void;
}

const RoomContext = React.createContext<TRoomContext>({
  activeRoom: null,
  changeRoom: () => null,
  updateRoom: () => null,
  resetRoom: () => null,
});

const RoomContextProvider = ({ children }: PropsWithChildren) => {
  const [activeRoom, setActiveRoom] = useState<TRoom | null>(null);

  const changeRoom = async (room: TRoom) => {
    activeRoom?._id && (await updateUnreadMessages(activeRoom._id));
    setActiveRoom(room);
  };

  const resetRoom = async () => {
    activeRoom?._id && (await updateUnreadMessages(activeRoom._id));
    setActiveRoom(null);
  };

  const updateUnreadMessages = async (roomId: string) => {
    await fetcher(`/api/rooms/${roomId}/messages/unread`, { method: "POST" });
  };

  const updateRoom = async () => {
    if (activeRoom) {
      await fetcher<TRoom>(`/api/rooms/${activeRoom._id}`).then(res => {
        if (res.success) setActiveRoom(res.data);
      });
    }
  };

  return (
    <RoomContext.Provider
      value={{ activeRoom, changeRoom, updateRoom, resetRoom }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => useContext(RoomContext);

export default RoomContextProvider;
