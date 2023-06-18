import { ImCheckboxChecked } from "react-icons/im";

import Image from "@/components/Image";
import getPhoto from "@/utils/getPhoto";

// Types
import { TUser } from "@/types";

interface UserProps {
  user: TUser;
  members: TUser[];
  updateMembers: (member: TUser) => void;
}

const User = ({ user, members, updateMembers }: UserProps) => {
  const userInMembers = members.some(member => member._id === user._id);
  return (
    <div
      className={`mb-2 flex cursor-pointer items-center gap-4 rounded-xl p-2 transition-colors last:mb-0 ${
        userInMembers ? "bg-accent/10" : "hover:bg-tcolor-2/10"
      }`}
      onClick={() => updateMembers(user)}
    >
      <Image
        src={getPhoto(user.photo)}
        alt={`${user.username} photo`}
        className="aspect-square w-8 rounded-lg"
      />
      <h3>{user.username}</h3>
      {userInMembers && (
        <ImCheckboxChecked className="ml-auto text-accent/75" />
      )}
    </div>
  );
};

export default User;
