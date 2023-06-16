import { TRoom } from "@/types";

const LastMessage = ({
  lastMessage,
}: {
  lastMessage: TRoom["lastMessage"];
}) => {
  {
    if (!lastMessage) {
      // In the process of populating the lastMessage
      // When the id is not found Mongoose will replace the id string with a null value
      return <p className="truncate text-sm">This message was deleted</p>;
    } else if (typeof lastMessage === "string") {
      return <p></p>;
    }

    const type = lastMessage.type;
    let content;

    if (type === "announcement") {
      content = lastMessage.content ?? "Announcement";
    } else {
      const senderName = lastMessage.senderId?.username;
      content = senderName ? `${senderName}: ` : "";

      if (lastMessage.content) {
        content += lastMessage.content;
      } else if (type === "file") {
        const fileType = lastMessage.file?.type;
        let fileName;

        switch (fileType?.substring(0, fileType.indexOf("/"))) {
          case "image":
            fileName = "image";
            break;
          case "video":
            fileName = "video";
            break;
          default:
            fileName = "file";
            break;
        }

        content += fileName;
      }
    }

    return <p className="truncate text-sm">{content}</p>;
  }
};

export default LastMessage;
