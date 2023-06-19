import { useState } from "react";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";

import { useRoomContext } from "@/context/RoomContext";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Image from "@/components/Image";
import getRoomPhoto from "@/utils/getPhoto";
import { fetcher } from "@/lib/fetcher";

// Types
import { Dispatch, SetStateAction } from "react";
import { TRoom } from "@/types";
import { Tap } from "../types";

interface RoomCardProps {
  setActiveTap: Dispatch<SetStateAction<Tap>>;
  room: TRoom;
}

const RoomCard = ({ room, setActiveTap }: RoomCardProps) => {
  const { changeRoom } = useRoomContext();
  const [loading, setLoading] = useState(false);

  const joinRoom = async () => {
    setLoading(true);

    const res = await fetcher(`/api/rooms/${room._id}/members/join`, {
      method: "POST",
    });

    setLoading(false);

    if (res.success) {
      toast.success(`Joined to ${room.name}`);
      changeRoom(room);
      setActiveTap("my rooms");
    } else {
      toast.error("Failed to join this room");
    }
  };

  return (
    <Card className="cursor-auto items-center">
      <Image
        src={getRoomPhoto(room.photo)}
        alt={`${room.name} photo`}
        className="aspect-square w-14 rounded-xl"
      />
      <h3 className="truncate font-medium text-tcolor">{room.name}</h3>

      <Button
        disabled={loading}
        className={loading ? "opacity-100" : ""}
        onClick={joinRoom}
      >
        <div className="min-w-[2rem]">
          {loading ? (
            <CgSpinner className="mx-auto animate-[spin_0.5s_linear_infinite;] text-2xl" />
          ) : (
            "Join"
          )}
        </div>
      </Button>
    </Card>
  );
};

export default RoomCard;
