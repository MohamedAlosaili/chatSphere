import { useRef, useEffect, memo, useState, UIEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImArrowDown2 } from "react-icons/im";

import Scrollable from "@/components/Scrollable";
import Message from "./Message";

// Types
import { TMessage } from "@/types";
import Button from "@/components/Button";

interface Props {
  messages: TMessage[];
  updateMessages: (nextPage?: boolean) => void;
  total: number;
}

const Conversation = ({ messages, updateMessages, total }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const loadMoreClicked = useRef(false);

  useEffect(() => {
    if (loadMoreClicked.current) {
      loadMoreClicked.current = false;
    } else {
      bottomRef.current?.scrollIntoView();
    }
  }, [messages]);

  const handleChatScroll = (e: UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const clinetHeight = e.currentTarget.clientHeight;

    if (scrollHeight - clinetHeight > scrollTop + 200) {
      !showScrollArrow && setShowScrollArrow(true);
    } else {
      showScrollArrow && setShowScrollArrow(false);
    }
  };

  const loadMoreMessages = () => {
    updateMessages(true);
    loadMoreClicked.current = true;
  };

  return (
    <>
      <Scrollable
        className="bg-[url(/images/chat-bg.png)] bg-contain p-4 px-2 min-[500px]:px-4"
        onScroll={handleChatScroll}
      >
        <div className="mx-auto max-w-4xl">
          {messages.length < total && (
            <Button onClick={loadMoreMessages} className="mb-4">
              Load more
            </Button>
          )}
          <div className="w-full ">
            {messages.map((message, idx, messages) => (
              <Message
                key={message._id}
                message={message}
                prevMessage={idx > 0 ? messages[idx - 1] : undefined}
              />
            ))}
          </div>
          <div ref={bottomRef} className="hello world"></div>
        </div>
      </Scrollable>
      <AnimatePresence>
        {showScrollArrow && (
          <motion.button
            initial={{ y: "25%", opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            exit={{ y: "25%", opacity: 0 }}
            onClick={() =>
              bottomRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="absolute bottom-24 left-4 z-30 rounded-xl bg-accent p-2 text-tcolor"
          >
            <ImArrowDown2 size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Conversation);
