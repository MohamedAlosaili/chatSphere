import { useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineArrowBackIos } from "react-icons/md";

import Image from "@/components/Image";
import { useRoomContext } from "@/context/RoomContext";
import getRoomPhoto from "@/utils/getPhoto";
import ToolTip from "@/components/ToolTip";

interface HeaderProps {
  toggleRoomInfo: () => void;
}

const Header = ({ toggleRoomInfo }: HeaderProps) => {
  const { activeRoom, resetRoom } = useRoomContext();
  /*
   * The purpose of this useRef is to store the activeRoom info. Why?
   * When activeRoom is reset the <Chat /> should be closed with a framer-motion
   * animation, but at that time activeRoom will be null, so we need a variable to hold room
   * info (persistent between renders) when <Chat /> is closing and activeRoom is null.
   * */
  const roomRef = useRef(activeRoom!);

  if (activeRoom) {
    roomRef.current = activeRoom;
  }

  return (
    <div className="sticky left-0 top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-accent/25 bg-bcolor-2/75 px-4 py-2">
      <button
        className="flex aspect-square w-8 items-center justify-center rounded-xl text-lg transition-colors hover:bg-bcolor/40"
        onClick={() => resetRoom()}
      >
        <MdOutlineArrowBackIos />
      </button>
      <Image
        src={getRoomPhoto(roomRef.current.photo ?? "")}
        alt={`${roomRef.current.name} photo`}
        className="aspect-square rounded-xl"
      />
      <h3 className="font-semibold text-tcolor">{roomRef.current.name}</h3>
      <button
        className="group relative ml-auto flex aspect-square w-8 items-center justify-center rounded-xl text-lg transition-colors hover:bg-bcolor/40"
        onClick={toggleRoomInfo}
      >
        <HiDotsVertical />
        <ToolTip position="left" text="Room Info" />
      </button>
    </div>
  );
};

export default Header;
