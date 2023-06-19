import { AnimatePresence } from "framer-motion";

import Chat from "./Chat";
import { useRoomContext } from "@/context/RoomContext";

const RoomWindow = () => {
  const { activeRoom } = useRoomContext();

  return (
    <div className="flex items-center justify-center bg-bcolor-2">
      {activeRoom ? (
        <Chat key={activeRoom._id} />
      ) : (
        <p className="m-2 rounded-xl bg-accent/20 px-3 py-2 text-tcolor">
          Select a room to start messaging...
        </p>
      )}
    </div>
  );
};

export default RoomWindow;
