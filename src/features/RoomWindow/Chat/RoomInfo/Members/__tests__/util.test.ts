import { roomMembers } from "../util";
import { describe, expect, it } from "vitest";
import { TMember, TUser } from "@/types";

describe("Room Members", () => {
  it("Should return empty members array", () => {
    expect(roomMembers("123", [], null)).toEqual({
      roomOwner: undefined,
      members: [],
      currentUserIsRoomOwner: false,
    });
  });

  it("Should return members wihtout owner and currentUser", () => {
    const currentUser = { _id: "1" };
    const roomOwner = { _id: "2" };
    const notCurrentUserAndNotOwner = { _id: "3" };

    const members = [
      { memberId: currentUser },
      { memberId: roomOwner },
      { memberId: notCurrentUserAndNotOwner },
    ];

    expect(
      roomMembers(
        roomOwner as TUser,
        members as TMember[],
        currentUser as TUser
      )
    ).toEqual({
      roomOwner: roomOwner,
      members: [{ memberId: notCurrentUserAndNotOwner }],
      currentUserIsRoomOwner: false,
    });
  });
});
