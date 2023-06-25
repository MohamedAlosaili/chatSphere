import { useState, MutableRefObject } from "react";
import { toast } from "react-toastify";

import { useRoomContext } from "@/context/RoomContext";
import Modal, { RoomInfo } from "./Modal";
import { fetcher } from "@/lib/fetcher";
import { socket } from "@/lib/socket";

/// Types
import { TRoom, TUser } from "@/types";
import { ToggleModalOptions } from "../types";

interface CreateRoomProps {
  close: (options?: ToggleModalOptions) => void;
  selectedUser?: TUser;
}

const CreateRoom = ({ selectedUser, close }: CreateRoomProps) => {
  const { changeRoom } = useRoomContext();

  const [loading, setLoading] = useState(false);

  const createNewRoom = async (
    roomInfoRef: MutableRefObject<RoomInfo>,
    members: TUser[]
  ) => {
    const { file, name, ...info } = roomInfoRef.current;

    if (!name) {
      toast.error("Name cannot be empty");
      return;
    }
    if (members.length === 0) {
      toast.error("Room must have one or more members");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("private", info.private.toString());

    // Duplicate to enforce formData to create an array
    // It'll be filtered by the server to remove duplication
    formData.append("members", members[0]._id);
    members.forEach(member => formData.append("members", member._id));

    if (file) {
      formData.append("photo", file);
    }

    setLoading(true);

    const res = await fetcher<TRoom>("/api/rooms", {
      method: "POST",
      data: formData,
    });

    setLoading(false);
    if (res.success && res.data) {
      toast.success(res.message ?? "New Room created");
      changeRoom(res.data);
      close({ redirect: true });
      socket.emit("update messages", res.data._id);
    } else {
      toast.error("Failed to create new room");
    }
  };

  const initialRoomInfo = {
    file: undefined,
    name: "",
    private: false,
  };
  const initialMembers = selectedUser ? [selectedUser] : [];

  return (
    <Modal
      type="new"
      close={close}
      loading={loading}
      initialRoomInfo={initialRoomInfo}
      initialMembers={initialMembers}
      roomModalActionHandler={createNewRoom}
    />
  );
};

export default CreateRoom;
