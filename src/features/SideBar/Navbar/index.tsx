import Link from "next/link";
import { HiOutlineChatBubbleLeftRight, HiUsers } from "react-icons/hi2";
import { BiMessageSquareAdd } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";

import Image from "@/components/Image";
import NavButton from "./NavButton";
import getUserPhoto from "@/utils/getPhoto";
import { useUserContext } from "@/context/UserContext";
import { Tap } from "../types";

interface Props {
  activeTap: Tap;
  setActiveTap: (tap: Tap) => void;
  onlineUsers: number;
}

const Navbar = ({ activeTap, setActiveTap, onlineUsers }: Props) => {
  const { user } = useUserContext();

  return (
    <nav className="absolute bottom-0 left-0 z-10 flex w-full shrink-0 justify-evenly overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-bcolor lg:relative lg:w-fit lg:flex-col lg:items-center lg:justify-start  lg:rounded-br-[2rem] lg:rounded-tl-none lg:rounded-tr-[2rem] lg:py-8">
      <NavButton
        onClick={() => setActiveTap("profile")}
        active={activeTap === "profile"}
      >
        <Image
          src={getUserPhoto(user!.photo)}
          alt={`${user?.username} photo`}
          className={`aspect-square w-8 rounded-2xl lg:w-12`}
        />
        <span
          className={`absolute bottom-4 right-4 aspect-square w-3 ${
            user!.isOnline ? "bg-green-500" : "bg-green-200"
          } rounded-full text-white`}
        ></span>
      </NavButton>
      <div className="my-4 hidden h-1 w-3/4 rounded-full bg-accent/25 lg:block"></div>
      <NavButton
        onClick={() => setActiveTap("my rooms")}
        active={activeTap === "my rooms"}
      >
        <HiOutlineChatBubbleLeftRight size={28} />
      </NavButton>
      <NavButton
        onClick={() => setActiveTap("users")}
        active={activeTap === "users"}
      >
        <HiUsers size={28} />
        <span
          className={`absolute bottom-2 right-4 h-5 min-w-[1.25rem] rounded-full bg-green-500 px-1 text-center text-xs leading-5 text-tcolor`}
        >
          {onlineUsers > 99 ? "+99" : onlineUsers}
        </span>
      </NavButton>
      <NavButton
        onClick={() => setActiveTap("public rooms")}
        active={activeTap === "public rooms"}
      >
        <BiMessageSquareAdd size={28} />
      </NavButton>
      <div className="hidden w-full flex-1 items-end lg:flex">
        <Link
          href="/logout"
          className="block w-full p-4 text-rose-500 transition-colors hover:bg-rose-500/10 hover:text-rose-500"
        >
          <HiLogout size={28} className="mx-auto" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
