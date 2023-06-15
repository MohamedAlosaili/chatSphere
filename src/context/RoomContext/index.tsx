import React, { PropsWithChildren, useContext, useState } from "react";

// Types
import { TRoom } from "@/types";

interface TRoomContext {
  room: TRoom | null;
  changeRoom: (room: TRoom) => void;
  resetRoom: () => void;
}

const RoomContext = React.createContext<TRoomContext>({
  room: null,
  changeRoom: () => null,
  resetRoom: () => null,
});

const RoomContextProvider = ({ children }: PropsWithChildren) => {
  const [room, setRoom] = useState<TRoom | null>(null);

  const changeRoom = (room: TRoom) => {
    setRoom(room);
  };

  const resetRoom = () => {
    setRoom(null);
  };

  return (
    <RoomContext.Provider value={{ room, changeRoom, resetRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => useContext(RoomContext);

export default RoomContextProvider;
