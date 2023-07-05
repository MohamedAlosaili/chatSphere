import getPhoto from "../getPhoto";
import { describe, expect, it } from "vitest";

describe("Return photo url", () => {
  it("Should return default user photo url", () => {
    const photo = "default-photo.png";
    expect(getPhoto(photo)).toBe(`/images/${photo}`);
  });

  it("Should return default room photo url", () => {
    const photo = "default-photo-room.png";
    expect(getPhoto(photo)).toBe(`/images/${photo}`);
  });

  it("Should return what get passed", () => {
    const photo = "https://chatsphere...";
    expect(getPhoto(photo)).toBe(photo);
  });
});
