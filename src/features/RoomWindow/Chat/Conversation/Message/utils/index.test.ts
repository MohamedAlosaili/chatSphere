import {
  isSameSender,
  isCurrentUserMessage,
  isAllowedToDelete,
  isAllowedToUpdate,
} from ".";
import { test, expect, describe, it } from "vitest";

import { TMessage, TRoom, TUser } from "@/types";

type Message = { senderId: Pick<TUser, "_id"> };

test("Should return true, current message sent by the same sender", () => {
  const _id = "1";

  const currentMessage: Message = { senderId: { _id } };

  const prevMessage: Message = { senderId: { _id } };

  expect(
    isSameSender(currentMessage as TMessage, prevMessage as TMessage)
  ).toBe(true);
});

test("Should return false, current message is not sent by the currentUser", () => {
  const currentMessage: Message = { senderId: { _id: "1" } };
  const currentUserId = "2";

  expect(isCurrentUserMessage(currentMessage as TMessage, currentUserId)).toBe(
    false
  );
});

test("Should return true, user allowed to update his message", () => {
  const currentUserId = { _id: "1" };

  const currentMessage: Message = { senderId: currentUserId };

  expect(
    isAllowedToUpdate(currentMessage as TMessage, currentUserId as TUser)
  ).toBe(true);
});

describe("Delete Message", () => {
  it("Should return true, user allowed to delete his message", () => {
    const currentUserId = { _id: "1" };

    const currentMessage: Message = { senderId: currentUserId };

    expect(
      isAllowedToDelete(
        currentMessage as TMessage,
        currentUserId as TUser,
        null
      )
    ).toBe(true);
  });

  it("Should return true, room owner allowed to delete room messages", () => {
    type Room = Pick<TRoom, "roomOwner">;
    const currentUserId = { _id: "1" };

    const currentMessage: Message = { senderId: { _id: "2" } };
    const room: Room = { roomOwner: "1" };

    expect(
      isAllowedToDelete(
        currentMessage as TMessage,
        currentUserId as TUser,
        room as TRoom
      )
    ).toBe(true);
  });
});
