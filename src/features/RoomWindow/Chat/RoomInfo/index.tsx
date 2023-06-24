import { useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { useRoomContext } from "@/context/RoomContext";
import Backdrop from "@/components/Backdrop";
import Image from "@/components/Image";
import Scrollable from "@/components/Scrollable";
import getRoomPhoto from "@/utils/getPhoto";
import Members from "./Members";
import Buttons from "./Buttons/index.tsx";

interface RoomInfoProps {
  toggleRoomInfo: () => void;
}

const RoomInfo = ({ toggleRoomInfo }: RoomInfoProps) => {
  const { activeRoom } = useRoomContext();
  /*
   * The purpose of this useRef is to store the activeRoom info. Why?
   * When activeRoom is reset the <Chat /> should be closed with a framer-motion
   * animation, but at that time activeRoom will be null, so we need a variable to hold room
   * info (persistent between renders) when <Chat /> is closing and activeRoom is null.
   * */
  const { current: room } = useRef(activeRoom!);

  return (
    <>
      <Backdrop onClick={toggleRoomInfo} className="absolute z-[100]" />
      <motion.div
        initial={{ right: "-100%" }}
        animate={{ right: 0 }}
        exit={{ right: "-100%" }}
        className="absolute right-0 top-0 z-[100] h-full w-full max-w-md bg-bcolor py-4 text-tcolor md:rounded-bl-[2rem] md:rounded-tl-[2rem] md:py-8"
      >
        <Scrollable className="flex flex-col gap-4 px-4 ">
          <h3 className="flex items-center">
            <button
              className="aspect-square w-8 rounded-xl text-lg leading-8 transition-colors hover:bg-accent/20"
              onClick={toggleRoomInfo}
            >
              <MdOutlineArrowBackIos className="mx-auto" />
            </button>
            <div className="mx-auto flex w-fit -translate-x-4 items-center  gap-2">
              Room Info <HiOutlineChatBubbleLeftRight size={20} />
            </div>
          </h3>
          <Image
            src={getRoomPhoto(room.photo)}
            alt={`${room.name} photo`}
            className="mx-auto aspect-square h-auto w-32 shrink-0 rounded-2xl"
          />
          <h2 className="shrink-0 truncate text-center text-2xl font-medium">
            {room.name}
          </h2>
          <Members room={room}>
            {(currentUserIsRoomOwner: boolean) => (
              <Buttons
                room={room}
                currentUserIsRoomOwner={currentUserIsRoomOwner}
              />
            )}
          </Members>
          <small>Created {getRoomCreatedAt(room.createdAt)}.</small>
        </Scrollable>
      </motion.div>
    </>
  );
};

const getRoomCreatedAt = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default RoomInfo;
