import { useRef, useState } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import { toast } from "react-toastify";

import AddMembers from "./AddMembers";
import BasicInfoTap from "./BasicInfoTap";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useRoomContext } from "@/context/RoomContext";
import { fetcher } from "@/lib/fetcher";

// Types
import { TRoom, TUser } from "@/types";
import { ToggleModalOptions } from "../types";

interface CreateNewRoomModalProps {
  close: (options?: ToggleModalOptions) => void;
  selectedUser?: TUser;
}

const CreateNewRoomModal = ({
  close,
  selectedUser,
}: CreateNewRoomModalProps) => {
  const { changeRoom } = useRoomContext();
  const [tap, setTap] = useState<"basic" | "members">("basic");

  const roomInfoRef = useRef({ file: undefined, name: "", private: false });
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<TUser[]>(
    selectedUser ? [selectedUser] : []
  );

  const createNewRoom = async () => {
    const { file, name, ...info } = roomInfoRef.current;

    if (!name) {
      return toast.error("Name cannot be empty");
    }
    if (members.length === 0) {
      return toast.error("Room must have one or more members");
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
    } else {
      toast.error("Failed to create new room");
    }
  };

  return (
    <Modal
      title={{
        text: `New Room`,
        icon: <BiMessageSquareAdd size={25} />,
      }}
      loading={loading}
      close={() => close()}
      buttons={false}
    >
      {tap === "basic" ? (
        <BasicInfoTap
          loading={loading}
          members={members}
          setMembers={setMembers}
          setTap={setTap}
          roomInfoRef={roomInfoRef}
        />
      ) : (
        <AddMembers members={members} setMembers={setMembers} />
      )}

      <div className="flex items-center gap-4">
        <Button
          onClick={() => (tap === "members" ? setTap("basic") : close())}
          className="flex-1"
          alt={true}
        >
          {tap === "members" ? "Previous" : "Cancel"}
        </Button>
        {members.length > 0 || tap === "members" ? (
          <Button
            onClick={createNewRoom}
            className="flex-1 grow-[2]"
            disabled={members.length === 0}
          >
            {loading ? "Creating room..." : "Create room"}
          </Button>
        ) : (
          <Button onClick={() => setTap("members")} className="flex-1 grow-[2]">
            Add Members
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default CreateNewRoomModal;
