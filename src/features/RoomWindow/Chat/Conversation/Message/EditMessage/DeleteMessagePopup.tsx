import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Modal from "@/components/Modal";
import { fetcher } from "@/lib/fetcher";
import { socket } from "@/lib/socket";

// Types
import { EditMessageProps } from "./type";

const DeleteMessagePopup = ({
  close,
  message,
  closeEditMessage,
}: EditMessageProps) => {
  const [loading, setLoading] = useState(false);
  const deleteMessage = async () => {
    setLoading(true);
    const res = await fetcher(
      `/api/rooms/${message.roomId}/messages/${message._id}`,
      { method: "DELETE" }
    );
    setLoading(false);

    if (res.success) {
      toast.success("Message deleted");
      close();
      closeEditMessage();
      socket.emit("update messages", message.roomId);
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Modal
      title={{
        text: "Delete Message",
        icon: <MdDelete size={20} className="text-rose-500" />,
      }}
      close={close}
      actionHandler={deleteMessage}
      actionName={loading ? "Deleting..." : "I'm sure"}
      loading={loading}
    >
      <p className="text-center">
        Are you sure you want to delete this message?
      </p>
    </Modal>
  );
};

export default DeleteMessagePopup;
