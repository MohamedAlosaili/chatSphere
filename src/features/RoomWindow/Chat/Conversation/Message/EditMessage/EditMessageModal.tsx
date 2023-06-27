import { useState } from "react";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { fetcher } from "@/lib/fetcher";

// Types
import { IndexSignature } from "@/types";
import { EditMessageProps } from "./type";
import { socket } from "@/lib/socket";

const EditMessageModal = ({
  close,
  closeEditMessage,
  ...props
}: EditMessageProps) => {
  const [message, setMessage] = useState<IndexSignature<string>>({
    text: props.message.content ?? "",
  });
  const [loading, setLoading] = useState(false);

  const updateMessage = async () => {
    if (message.text.trim() === props.message.content) {
      close();
      closeEditMessage();
      return;
    }

    if (message.text.trim() === "" && props.message.type === "text") {
      return toast.error("Text message cannot be empty");
    }

    setLoading(true);
    const res = await fetcher(
      `/api/rooms/${props.message.roomId}/messages/${props.message._id}`,
      { method: "PUT", data: { content: message.text } }
    );
    setLoading(false);

    if (res.success) {
      close();
      closeEditMessage();
      toast.success("Message Updated");
      socket.emit("update messages", props.message.roomId);
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Modal
      title={{ text: "Edit Message", icon: <FiEdit2 size={20} /> }}
      loading={loading}
      close={close}
      actionHandler={updateMessage}
      actionName={loading ? "Updating..." : "Update"}
    >
      <Input
        name="text"
        value={message.text}
        setValue={setMessage}
        disabled={loading}
        placeholder="Type a message..."
        autoComplete="off"
      />
    </Modal>
  );
};

export default EditMessageModal;
