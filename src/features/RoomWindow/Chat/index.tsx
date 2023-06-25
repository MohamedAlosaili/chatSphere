import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import useDocuments from "@/hooks/useDocuments";
import useSocketListener from "@/hooks/useSocketListener";
import { useRoomContext } from "@/context/RoomContext";
import { useUserContext } from "@/context/UserContext";
import Conversation from "./Conversation";
import Form from "./Form";
import Header from "./Header";
import RoomInfo from "./RoomInfo";

// Types
import { TMessage } from "@/types";

const Chat = () => {
  const { user } = useUserContext();
  const { activeRoom, updateRoom, resetRoom } = useRoomContext();
  const [messages, , updateMessages, total] = useDocuments<TMessage>(
    `/api/rooms/${activeRoom?._id}/messages?sort=createdAt`,
    { limitToLast: true }
  );

  useSocketListener([
    {
      event: `room-${activeRoom?._id} removed-${user?._id}`,
      listener: () => resetRoom(true),
    },
    { event: `room-${activeRoom?._id} messages`, listener: updateMessages },
    { event: `room-${activeRoom?._id} info`, listener: updateRoom },
  ]);

  const [showRoomInfo, setShowRoomInfo] = useState(false);

  const toggleRoomInfo = () => {
    setShowRoomInfo(prev => !prev);
  };

  return (
    <motion.div
      initial={{ left: "100%", opacity: 0 }}
      animate={{ left: 0, opacity: 1 }}
      exit={{ left: "100%", opacity: 0 }}
      className="fixed left-0 top-0 z-10 h-screen w-full bg-bcolor-2 md:static"
    >
      <div className="relative flex h-full w-full flex-col ">
        <Header toggleRoomInfo={toggleRoomInfo} />
        <Conversation
          messages={messages}
          updateMessages={updateMessages}
          total={total}
        />
        <AnimatePresence>
          {showRoomInfo && <RoomInfo toggleRoomInfo={toggleRoomInfo} />}
        </AnimatePresence>
        <Form />
      </div>
    </motion.div>
  );
};

export default Chat;
