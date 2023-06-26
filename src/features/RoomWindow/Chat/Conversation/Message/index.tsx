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
          "gap flex w-full max-w-[min(95%,_30rem)] gap-4",
          currentUserMessage && "flex-row-reverse"
        )}
      >
        {!currentUserMessage && (
          <div className="relative aspect-square w-10 shrink-0 self-start">
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
            "flex max-w-full flex-col rounded-xl bg-bcolor/75 p-1",
            currentUserMessage && "relative bg-accent/30",
            message.type === "file" && "flex-1"
          )}
        >
          {!sameSender && !currentUserMessage && (
            <h3 className="mb-1 truncate border-b border-accent/20 px-2 font-semibold text-tcolor">
              {message.senderId?.username}
            </h3>
          )}
          {message.type === "file" && (
            <File message={message} prevMessage={prevMessage} />
          )}
          <div className="flex flex-1 flex-wrap justify-between first:pt-2">
            {message.content && (
              <p className="px-2 pb-2 text-tcolor">{message.content}</p>
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
