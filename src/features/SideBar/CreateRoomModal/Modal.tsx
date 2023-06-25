import { useState, useRef, MutableRefObject } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";

import BasicInfoTap from "./BasicInfoTap";
import AddMembers from "./AddMembers";
import ModalComponent from "@/components/Modal";
import Button from "@/components/Button";

// Types
import { TUser } from "@/types";

export type RoomInfo = {
  file: undefined | File;
  name: string;
  private: boolean;
};

interface RoomModalProps {
  type: "new" | "update";
  close: () => void;
  loading: boolean;
  initialRoomInfo: RoomInfo;
  initialMembers: TUser[];
  roomModalActionHandler: (
    roomInfoRef: MutableRefObject<RoomInfo>,
    members: TUser[]
  ) => Promise<void>;
  roomPhoto?: string;
}

const Modal = ({
  type,
  close,
  loading,
  initialRoomInfo,
  initialMembers,
  roomPhoto,
  roomModalActionHandler,
}: RoomModalProps) => {
  const [tap, setTap] = useState<"basic" | "members">("basic");
  const roomInfoRef = useRef<RoomInfo>(initialRoomInfo);
  const [members, setMembers] = useState<TUser[]>(initialMembers);

  return (
    <ModalComponent
      title={{
        text: `${type === "new" ? "New" : "Update"} Room`,
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
          roomPhoto={roomPhoto}
        />
      ) : (
        <AddMembers members={members} setMembers={setMembers} />
      )}

      <div className="flex flex-wrap-reverse items-center gap-4">
        <Button
          onClick={() => (tap === "members" ? setTap("basic") : close())}
          className="flex-1"
          alt={true}
          disabled={loading}
        >
          {tap === "members" ? "Previous" : "Cancel"}
        </Button>
        {members.length === 0 && tap === "basic" && (
          <Button
            disabled={loading}
            onClick={() => setTap("members")}
            className="min-w-max flex-1"
          >
            Add Members
          </Button>
        )}
        {(members.length > 0 || tap === "members" || type === "update") && (
          <Button
            onClick={() => roomModalActionHandler(roomInfoRef, members)}
            className="min-w-max flex-1"
            disabled={(members.length === 0 && type === "new") || loading}
          >
            {loading
              ? `${type === "new" ? "Creating" : "Updating"} room...`
              : `${type === "new" ? "Create" : "Update"} room`}
          </Button>
        )}
      </div>
    </ModalComponent>
  );
};

export default Modal;
