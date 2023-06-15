import Link from "next/link";
import { HiOutlineChatBubbleLeftRight, HiUsers } from "react-icons/hi2";
import { BiMessageSquareAdd } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";

import Image from "@/components/Image";
import NavButton from "./NavButton";
import getUserPhoto from "@/utils/getUerPhoto";
import { useUserContext } from "@/context/UserContext";
import { Tap } from "../types";

interface Props {
  activeTap: Tap;
  setActiveTap: (tap: Tap) => void;
}

const Navbar = ({ activeTap, setActiveTap }: Props) => {
  const { user } = useUserContext();

  return (
    <nav className="bg-bcolor overflow-hidden lg:py-8 lg:justify-start lg:items-center z-10 flex lg:flex-col lg:w-fit justify-evenly w-full rounded-tr-2xl rounded-tl-2xl lg:rounded-tl-none lg:rounded-br-[2rem] lg:rounded-tr-[2rem]  absolute bottom-0 left-0 lg:relative">
      <NavButton
        onClick={() => setActiveTap("profile")}
        active={activeTap === "profile"}
      >
        <Image
          src={getUserPhoto(user!.photo)}
          alt={`${user?.username} photo`}
          className={`w-8 lg:w-12 aspect-square rounded-2xl`}
        />
        <span
          className={`absolute bottom-4 right-4 w-3 aspect-square ${
            user!.isOnline ? "bg-green-500" : "bg-green-200"
          } rounded-full text-white`}
        ></span>
      </NavButton>
      <div className="hidden lg:block w-3/4 h-1 bg-accent/25 rounded-full my-4"></div>
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
          className={`absolute bottom-2 right-4 px-1 py-px ${
            user!.isOnline ? "bg-green-500" : "bg-green-200"
          } rounded-full text-white text-xs`}
        >
          22
        </span>
      </NavButton>
      <NavButton
        onClick={() => setActiveTap("public rooms")}
        active={activeTap === "public rooms"}
      >
        <BiMessageSquareAdd size={28} />
      </NavButton>
      <div className="hidden w-full flex-1 lg:flex items-end">
        <Link
          href="/logout"
          className="transition-colors block p-4 text-red-700 hover:text-red-600 hover:bg-red-600/10 w-full"
        >
          <HiLogout size={28} className="mx-auto" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
