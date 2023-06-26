import { memo } from "react";

import useLeaveRoom from "./useLeaveRoom";
import Button from "@/components/Button";

// Types
import { TRoom } from "@/types";

interface ButtonsProps {
  room: TRoom;
  currentUserIsRoomOwner: boolean;
  showUpdateModal: () => void;
}

const Buttons = ({
  room,
  currentUserIsRoomOwner,
  showUpdateModal,
}: ButtonsProps) => {
  const { leaveRoom, loading } = useLeaveRoom(room);

  return (
    <div className="mx-auto w-full max-w-xs">
      {currentUserIsRoomOwner && (
        <Button
          className="mb-4 w-full"
          disabled={loading}
          onClick={showUpdateModal}
        >
          Update Room Info
        </Button>
      )}
      <Button
        className="w-full border-rose-500 font-bold text-rose-500 hover:bg-rose-500/10"
        alt={true}
        disabled={loading}
        onClick={leaveRoom}
      >
        {loading ? "Leaving..." : "Leave Room"}
      </Button>
    </div>
  );
};

export default memo(Buttons);
