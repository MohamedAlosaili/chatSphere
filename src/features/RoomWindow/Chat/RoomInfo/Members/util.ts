import { TMember, TRoom, TUser } from "@/types";

interface RoomMembers {
  roomOwner: TUser | undefined;
  members: TMember[];
  currentUserIsRoomOwner: boolean;
}

export const roomMembers = (
  room: TRoom,
  members: TMember[],
  currentUser: TUser | null
): RoomMembers => {
  if (!room || !currentUser) {
    return { roomOwner: undefined, members: [], currentUserIsRoomOwner: false };
  }

  const roomOwnerId =
    typeof room.roomOwner === "string" ? room.roomOwner : room.roomOwner._id;
  const roomOwner =
    typeof room.roomOwner === "string" ? undefined : room.roomOwner;

  const currentUserIsRoomOwner = roomOwnerId === currentUser._id;

  const filteredMembers = members.filter(
    member =>
      member.memberId._id !== currentUser._id &&
      member.memberId._id !== roomOwnerId
  );

  return {
    roomOwner,
    members: filteredMembers,
    currentUserIsRoomOwner,
  };
};
