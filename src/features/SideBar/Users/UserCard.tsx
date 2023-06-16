import { BiMessageSquareAdd } from "react-icons/bi";

import Image from "@/components/Image";
import Card from "@/components/Card";
import getUserPhoto from "@/utils/getPhoto";

// Types
import { TUser } from "@/types";
import Button from "@/components/Button";

const UserCard = ({ user }: { user: TUser }) => {
  return (
    <Card className={`cursor-auto`}>
      <Image
        src={getUserPhoto(user.photo)}
        alt={`${user.username} photo`}
        className="aspect-square w-14 rounded-xl"
      />
      <div className="flex flex-col justify-center gap-2 overflow-hidden">
        <h3 className="truncate font-medium text-tcolor">{user.username}</h3>
      </div>
      <div className="flex max-w-[4rem] flex-col items-center justify-center gap-2 text-xs">
        {/* TODO: add onClick - show CreateRoomModal */}
        <Button className="px-2">
          <BiMessageSquareAdd size={28} />
        </Button>
      </div>
    </Card>
  );
};

export default UserCard;
