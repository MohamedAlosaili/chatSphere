import { BiMessageSquareAdd } from "react-icons/bi";

import Image from "@/components/Image";
import Card from "@/components/Card";
import getUserPhoto from "@/utils/getPhoto";
import Button from "@/components/Button";

// Types
import { TUser } from "@/types";
import { ToggleModalOptions } from "../types";

interface UserCardProps {
  user: TUser;
  showCreateRoomModal: (options?: ToggleModalOptions) => void;
}

const UserCard = ({ user, showCreateRoomModal }: UserCardProps) => {
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
        <Button
          className="px-2"
          // 
          onClick={() => showCreateRoomModal({selectedUser: user})}
        >
          <BiMessageSquareAdd size={28} />
        </Button>
      </div>
    </Card>
  );
};

export default UserCard;
