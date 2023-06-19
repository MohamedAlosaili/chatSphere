import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import useDocuments from "@/hooks/useDocuments";
import { useRoomContext } from "@/context/RoomContext";
import Conversation from "./Conversation";
import Form from "./Form";
import Header from "./Header";
import { socket } from "@/lib/socket";

// Types
import { TMessage } from "@/types";

const Chat = () => {
  const { activeRoom } = useRoomContext();
  const roomRef = useRef(activeRoom!);
  const [messages, , update, total] = useDocuments<TMessage>(
    `/api/rooms/${activeRoom?._id}/messages?sort=createdAt`,
    { limitToLast: true }
  );

  useEffect(() => {
    socket.on(`room-${activeRoom?._id}`, update);
    return () => {
      socket.off(`room-${activeRoom?._id}`, update);
    };
  }, []);

  return (
    <div className="absolute left-0 top-0 z-10 flex h-screen w-full flex-col bg-bcolor-2 md:relative">
      <Header room={roomRef.current} />
      <Conversation messages={messages} updateMessages={update} total={total} />
      <Form updateMessages={update} />
    </div>
  );
};

export default Chat;
