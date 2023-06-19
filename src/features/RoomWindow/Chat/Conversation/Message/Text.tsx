import { twMerge } from "tailwind-merge";

import { useUserContext } from "@/context/UserContext";
import Image from "@/components/Image";
import getUserPhoto from "@/utils/getPhoto";
import { getMessageTime, isCurrentUserMessage, isSameSender } from "./utils";

// Types
import { MessageProps } from "./type";

const Text = ({ message, prevMessage }: MessageProps) => {
  const { user } = useUserContext();
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
          "flex max-w-[min(95%,_30rem)] gap-4",
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
            "overflow-hidden rounded-xl bg-bcolor/75 p-3",
            currentUserMessage && "relative bg-accent/30"
          )}
        >
          {!sameSender && !currentUserMessage && (
            <h3 className="mb-2 truncate border-b border-accent/20 font-semibold text-tcolor">
              {message.senderId?.username}
            </h3>
          )}
          <p className="text-tcolor">{message.content}</p>
          <time
            className={twMerge(
              "mt-1 block text-right text-xs",
              currentUserMessage && "text-left"
            )}
          >
            {getMessageTime(message.createdAt)}
          </time>
        </div>
      </div>
    </div>
  );
};

export default Text;
