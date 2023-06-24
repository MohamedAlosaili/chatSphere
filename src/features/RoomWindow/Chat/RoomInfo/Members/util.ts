import { TMember, TUser } from "@/types";

interface RoomMembers {
  roomOwner: TUser | undefined;
  members: TMember[];
  currentUserIsRoomOwner: boolean;
}

export const roomMembers = (
  owner: string | TUser,
  members: TMember[],
  currentUser: TUser | null
): RoomMembers => {
  if (!owner || !currentUser) {
    return {
      roomOwner: undefined,
      members: [],
      currentUserIsRoomOwner: false,
    };
  }

  const roomOwnerId = typeof owner === "string" ? owner : owner._id;
  const roomOwner = typeof owner === "string" ? undefined : owner;

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
