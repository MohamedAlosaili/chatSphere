import Image from "@/components/Image";
import Video from "@/components/Video";
import MediaModal from "./MediaModal";

// Types
import { MessageProps } from "../type";

const File = ({ message }: MessageProps) => {
  const file = message.file!;

  return (
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
              className="w-full rounded-xl"
            />
          )}
        </MediaModal>
      )}
    </div>
  );
};

export default File;
