import { twMerge } from "tailwind-merge";

import { useUserContext } from "@/context/UserContext";
import Announcement from "./Announcement";
import File from "./File";
import Image from "@/components/Image";
import getUserPhoto from "@/utils/getPhoto";
import { getMessageTime, isCurrentUserMessage, isSameSender } from "./utils";

// Types
import { MessageProps } from "./type";

const Message = ({ message, prevMessage }: MessageProps) => {
  const { user } = useUserContext();

  if (message.type === "announcement") {
    return <Announcement message={message} />;
  }

  const sameSender = isSameSender(message, prevMessage);
  const currentUserMessage = isCurrentUserMessage(message, user?._id);

  return (
    <div
      className={twMerge(
        "mb-4 flex",
        sameSender && "-mt-2",
        currentUserMessage && "flex-row-reverse"
      )}
    >
      <div
        className={twMerge(
          "flex w-full max-w-[min(95%,_30rem)] gap-2 sm:gap-4",
          currentUserMessage && "flex-row-reverse"
        )}
      >
        {!currentUserMessage && (
          <div className="relative aspect-square w-8 shrink-0 self-start sm:w-10">
            {!sameSender && (
              <Image
                src={getUserPhoto(message.senderId?.photo ?? "")}
                alt={`${message.senderId?.username} photo`}
                className="rounded-xl"
              />
            )}
          </div>
        )}
        <div
          className={twMerge(
            "relative flex max-w-full flex-col rounded-xl bg-bcolor/75 p-1",
            currentUserMessage && "bg-accent/30",
            message.type === "file" && "flex-1",
            !sameSender &&
              (currentUserMessage ? "rounded-tr-none" : "rounded-tl-none")
          )}
        >
          {!sameSender && (
            <div
              className={twMerge(
                "absolute right-full top-0 -z-10 h-6 w-2 overflow-hidden sm:w-3",
                currentUserMessage && "left-full right-auto"
              )}
            >
              <div
                className={twMerge(
                  "absolute left-1 top-1/2 -mt-[10px] aspect-square w-4 -translate-y-1/2 rotate-45 rounded-sm bg-bcolor/75 sm:-mt-2 sm:w-6 sm:rounded-[0.25rem]",
                  currentUserMessage && "left-auto right-1 bg-accent/30"
                )}
              ></div>
            </div>
          )}
          {!sameSender && !currentUserMessage && (
            <h3 className="mb-1 truncate border-b border-accent/20 px-2 font-semibold text-tcolor">
              {message.senderId?.username}
            </h3>
          )}
          {message.type === "file" && (
            <File message={message} prevMessage={prevMessage} />
          )}
          <div className="flex flex-1 flex-wrap justify-between">
            {message.content && (
              <p className="p-2 text-tcolor">{message.content}</p>
            )}
            <time
              className={twMerge(
                "mt-1 block flex-1 self-end px-1 text-right text-xs",
                currentUserMessage && "text-left"
              )}
            >
              {getMessageTime(message.createdAt)}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
