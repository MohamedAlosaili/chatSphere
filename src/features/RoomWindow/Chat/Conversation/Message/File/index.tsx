import { twMerge } from "tailwind-merge";

import Image from "@/components/Image";
import Video from "@/components/Video";
import MediaModal from "./MediaModal";
import getUserPhoto from "@/utils/getPhoto";
import { getMessageTime, isCurrentUserMessage, isSameSender } from "../utils";
import { useUserContext } from "@/context/UserContext";

// Types
import { MessageProps } from "../type";

const File = ({ message, prevMessage }: MessageProps) => {
  const { user } = useUserContext();
  const sameSender = isSameSender(message, prevMessage);
  const currentUserMessage = isCurrentUserMessage(message, user?._id);
  const file = message.file!;

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
          "gap flex w-[min(95%,_30rem)] gap-4",
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
            "flex flex-1 flex-col rounded-xl bg-bcolor/75 p-1",
            currentUserMessage && "relative bg-accent/30"
          )}
        >
          {!sameSender && !currentUserMessage && (
            <h3 className="mb-2 truncate border-b border-accent/20 font-semibold text-tcolor">
              {message.senderId?.username}
            </h3>
          )}
          <div
            className={`w-full ${
              file.type.startsWith("video") ? "aspect-video" : "aspect-square"
            }`}
          >
            {file.type.startsWith("video") ? (
              <MediaModal type="video">
                {videoRef => (
                  <Video
                    url={file.url}
                    type={file.type}
                    videoRef={videoRef}
                    autoPlay={false}
                    className="w-full rounded-xl"
                  />
                )}
              </MediaModal>
            ) : (
              <MediaModal type="image">
                {() => (
                  <Image
                    src={file.url}
                    alt={message.content ? message.content : "Message"}
                    className="aspect-square w-full rounded-xl"
                  />
                )}
              </MediaModal>
            )}
          </div>
          <div className="p-3">
            {message.content && (
              <p className="text-tcolor">{message.content}</p>
            )}
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
    </div>
  );
};

export default File;
