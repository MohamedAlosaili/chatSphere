import Announcement from "./Announcement";
import File from "./File";
import Text from "./Text";

// Types
import { MessageProps } from "./type";

const Message = ({ message, prevMessage }: MessageProps) => {
  switch (message.type) {
    case "announcement":
      return <Announcement message={message} />;
    case "text":
      return <Text message={message} prevMessage={prevMessage} />;
    case "file":
      return <File message={message} prevMessage={prevMessage} />;
  }
};

export default Message;
