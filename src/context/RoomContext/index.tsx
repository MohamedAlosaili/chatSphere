import React, { PropsWithChildren, useContext, useState } from "react";

// Types
import { TRoom } from "@/types";
import { fetcher } from "@/lib/fetcher";

interface TRoomContext {
  activeRoom: TRoom | null;
  changeRoom: (room: TRoom) => void;
  resetRoom: () => void;
}

const RoomContext = React.createContext<TRoomContext>({
  activeRoom: null,
  changeRoom: () => null,
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

  return (
    <RoomContext.Provider value={{ activeRoom, changeRoom, resetRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => useContext(RoomContext);

export default RoomContextProvider;
