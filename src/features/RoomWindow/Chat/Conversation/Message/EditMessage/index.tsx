import { MutableRefObject, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import DeleteMessagePopup from "./DeleteMessagePopup";
import EditMessageModal from "./EditMessageModal";

// Types
import { TMessage } from "@/types";

interface EditMenuProps {
  isAllowedToUpdate: boolean;
  message: TMessage;
  messageRef: MutableRefObject<HTMLDivElement | null>;
  toggleEditMessage: () => void;
}

// This should be constant across this component
const menuWidth = 250;
const menuHeight = 250;

const EditMessage = ({
  message,
  messageRef,
  isAllowedToUpdate,
  toggleEditMessage,
}: EditMenuProps) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const messageRect = messageRef.current?.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  useLayoutEffect(() => {
    let translateY = 0;
    const msgPos = windowHeight - (messageRect?.bottom ?? 0);

    if (msgPos < menuHeight) {
      if (msgPos > 0) {
        translateY = menuHeight - msgPos;
      } else {
        translateY = Math.abs(msgPos) + menuHeight;
      }
    }

    if (messageRef.current) {
      messageRef.current.style.transform = `translateY(-${translateY}px)`;
    }
  }, []);

  const toggleDeletePopup = () => setShowDeletePopup(prev => !prev);
  const toggleEditModal = () => setShowEditModal(prev => !prev);

  const menuPos = {
    "--top-pos": `${topPosition(messageRect)}px`,
    "--left-pos": `${leftPosition(messageRect)}px`,
  };

  return (
    <>
      <AnimatePresence>
        {showDeletePopup && (
          <DeleteMessagePopup
            close={toggleDeletePopup}
            message={message}
            closeEditMessage={toggleEditMessage}
          />
        )}
        {showEditModal && (
          <EditMessageModal
            close={toggleEditModal}
            message={message}
            closeEditMessage={toggleEditMessage}
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ zIndex: -1, opacity: 0, scale: 0.6, x: "-50%" }}
        animate={{ zIndex: 101, opacity: 1, scale: 1, x: "-50%" }}
        exit={{ zIndex: -1, opacity: 0, scale: 0.6, x: "-50%" }}
        style={menuPos as any}
        className={`fixed left-[--left-pos] top-[--top-pos] flex w-[250px] min-w-[15rem] flex-col overflow-hidden rounded-xl border-2 border-accent/30 bg-bcolor font-medium text-tcolor`}
      >
        {isAllowedToUpdate && (
          <button
            onClick={toggleEditModal}
            className="flex items-center justify-between gap-2 border-b border-accent/30 p-4 text-left transition-colors hover:bg-accent/10"
          >
            Edit Message <FiEdit2 size={20} />
          </button>
        )}
        <button
          onClick={toggleDeletePopup}
          className="flex items-center justify-between gap-2 p-4 text-left text-rose-500 transition-colors hover:bg-rose-500/10"
        >
          Delete Message <MdDelete size={20} />
        </button>
      </motion.div>
    </>
  );
};

const leftPosition = (messageRect: DOMRect | undefined) => {
  const windowWidth = window.innerWidth;
  if (messageRect) {
    if (messageRect.width > menuWidth) {
      return messageRect.left + messageRect.width / 2;
    } else if (windowWidth - messageRect.left < menuWidth) {
      return windowWidth - menuWidth / 2 - 16;
    } else {
      return messageRect.left + menuWidth / 2;
    }
  } else {
    return "50%";
  }
};

const topPosition = (messageRect: DOMRect | undefined) => {
  const windowHeight = window.innerHeight;
  if (messageRect) {
    if (windowHeight - messageRect.bottom < menuWidth) {
      return windowHeight - menuHeight + 16;
    } else {
      return messageRect.bottom + 16;
    }
  } else {
    return windowHeight - menuHeight + 16;
  }
};

export default EditMessage;
