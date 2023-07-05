import { TMessage, TRoom, TUser } from "@/types";

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

export const isAllowedToUpdate = (message: TMessage, currentUser: TUser) => {
  return message.senderId?._id === currentUser._id;
};

export const isAllowedToDelete = (
  message: TMessage,
  currentUser: TUser,
  room: TRoom | null
) => {
  const roomOwner =
    room?.roomOwner && typeof room.roomOwner !== "string"
      ? room.roomOwner._id
      : room?.roomOwner;
  return (
    currentUser._id === message.senderId?._id || currentUser._id === roomOwner
  );
};
