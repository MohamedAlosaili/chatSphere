import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

// Types
import { TRoom } from "@/types";
import { fetcher } from "@/lib/fetcher";

interface TRoomContext {
  activeRoom: TRoom | null;
  changeRoom: (room: TRoom) => void;
  updateRoom: () => void;
  resetRoom: (isUserRemoved?: boolean) => void;
}

const RoomContext = React.createContext<TRoomContext>({
  activeRoom: null,
  changeRoom: () => null,
  updateRoom: () => null,
  resetRoom: () => null,
});

const RoomContextProvider = ({ children }: PropsWithChildren) => {
  const [activeRoom, setActiveRoom] = useState<TRoom | null>(null);
  const userRemovedRef = useRef(false);

  useEffect(() => {
    if (activeRoom?._id) updateRoom();
  }, [activeRoom?._id]);

  const changeRoom = async (room: TRoom) => {
    activeRoom?._id && (await updateUnreadMessages(activeRoom._id));
    setActiveRoom(room);
  };

  const resetRoom = async (isUserRemoved?: boolean) => {
    if (isUserRemoved) {
      userRemovedRef.current = true;
    }
    activeRoom?._id && (await updateUnreadMessages(activeRoom._id));
    setActiveRoom(null);
  };

  const updateUnreadMessages = async (roomId: string) => {
    await fetcher(`/api/rooms/${roomId}/messages/unread`, { method: "POST" });
  };

  const updateRoom = async () => {
    if (activeRoom && !userRemovedRef.current) {
      await fetcher<TRoom>(`/api/rooms/${activeRoom._id}`).then(res => {
        if (res.success) setActiveRoom(res.data);
      });
    } else {
      userRemovedRef.current = false;
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
