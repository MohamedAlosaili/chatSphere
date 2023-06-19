import { TMessage } from "@/types";

export const getMessageTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", { timeStyle: "short" });
};

export const isSameSender = (msg: TMessage, prevMsg: TMessage | undefined) => {
  const currentMessageSender = msg.senderId?._id;
  const prevMessageSender = prevMsg?.senderId?._id;

  return currentMessageSender === prevMessageSender;
};

export const isCurrentUserMessage = (
  msg: TMessage,
  currentUserId: string | undefined
) => {
  const messageSender = msg.senderId?._id;

  return messageSender === currentUserId;
};
