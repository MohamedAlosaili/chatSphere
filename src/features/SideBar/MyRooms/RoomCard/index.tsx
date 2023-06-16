import useUnreadMessages from "./useUnreadMessages";
import { useRoomContext } from "@/context/RoomContext";
import Image from "@/components/Image";
import Card from "@/components/Card";
import LastMessage from "./LastMessage";
import getRoomPhoto from "@/utils/getPhoto";
import relativeTime from "./getRelativeTime";

// Types
import { TRoom } from "@/types";

const RoomCard = ({ room }: { room: TRoom }) => {
  const { activeRoom, changeRoom } = useRoomContext();
  const unreadMessages = useUnreadMessages(room._id);

  const isActive = activeRoom?._id === room._id;

  return (
    <Card
      className={`${
        isActive ? "bg-accent/20 hover:bg-accent/20 active:bg-accent/30" : ""
      }`}
      onClick={() => changeRoom(room)}
    >
      <Image
        src={getRoomPhoto(room.photo)}
        alt={`${room.name} photo`}
        className="aspect-square w-14 rounded-xl"
      />
      <div className="flex flex-col justify-center gap-2 overflow-hidden">
        <h3 className="truncate font-medium text-tcolor">{room.name}</h3>
        <LastMessage lastMessage={room.lastMessage} />
      </div>
      <div className="flex max-w-[4rem] flex-col items-center justify-center gap-2 text-xs">
        <div>{relativeTime(room.updatedAt)}</div>
        {unreadMessages > 0 && (
          <div className="h-5 min-w-[1.25rem] rounded-full bg-accent px-1 text-center leading-5 text-tcolor">
            {unreadMessages > 99 ? "+99" : unreadMessages}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RoomCard;
