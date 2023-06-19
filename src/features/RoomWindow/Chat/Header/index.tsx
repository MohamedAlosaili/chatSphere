import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineArrowBackIos } from "react-icons/md";

import Image from "@/components/Image";
import { useRoomContext } from "@/context/RoomContext";
import getRoomPhoto from "@/utils/getPhoto";

// Types
import { TRoom } from "@/types";

const Header = ({ room }: { room: TRoom }) => {
  const { resetRoom } = useRoomContext();

  return (
    <div className="sticky left-0 top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-accent/25 bg-bcolor-2/75 px-4 py-2">
      <button
        className="flex aspect-square w-8 items-center justify-center rounded-xl text-lg transition-colors hover:bg-bcolor/40"
        onClick={resetRoom}
      >
        <MdOutlineArrowBackIos />
      </button>
      <Image
        src={getRoomPhoto(room.photo ?? "")}
        alt={`${room.name} photo`}
        className="aspect-square rounded-xl"
      />
      <h3 className="font-semibold text-tcolor">{room.name}</h3>
      <button className="ml-auto flex aspect-square w-8 items-center justify-center rounded-xl text-lg transition-colors hover:bg-bcolor/40">
        <HiDotsVertical />
      </button>
    </div>
  );
};

export default Header;
