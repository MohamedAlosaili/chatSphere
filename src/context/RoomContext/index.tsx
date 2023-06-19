import React, { PropsWithChildren, useContext, useState } from "react";

// Types
import { TRoom } from "@/types";

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

  const changeRoom = (room: TRoom) => {
    setActiveRoom(room);
  };

  const resetRoom = () => {
    setActiveRoom(null);
  };

  return (
    <RoomContext.Provider value={{ activeRoom, changeRoom, resetRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => useContext(RoomContext);

export default RoomContextProvider;
