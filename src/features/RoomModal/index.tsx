import { toast } from "react-toastify";

// Types
import { TMember, TRoom, TUser } from "@/types";
import { ToggleModalOptions } from "@/features/SideBar/types";
import CreateRoom from "./CreateRoom";
import UpdateRoom from "./UpdateRoom";

interface RoomModalProps {
  type?: "new" | "update";
  close: RoomModalProps["type"] extends "new"
    ? (options?: ToggleModalOptions) => void
    : () => void;
  selectedUser?: TUser;
  room?: Room;
}

type Room = TRoom & { members: TMember[] };

const RoomModal = ({
  type = "new",
  close,
  room,
  selectedUser,
}: RoomModalProps) => {
  if (type === "update" && !room) {
    toast.error("Something went wrong!");
    return <></>;
  }

  return type === "update" ? (
    <UpdateRoom {...{ type, close }} room={room as Room} />
  ) : (
    <CreateRoom {...{ type, close, selectedUser }} />
  );
};

export default RoomModal;
