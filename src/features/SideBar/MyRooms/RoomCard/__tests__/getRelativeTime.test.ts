import getRelativeTime, { weekDays } from "../getRelativeTime";
import { describe, expect, it } from "vitest";

describe("relativeTime", () => {
  it("Should return the short time format if the difference is less than a day", () => {
    const date = new Date();
    expect(getRelativeTime(date.toISOString())).toBe(
      date.toLocaleTimeString(undefined, { timeStyle: "short" })
    );
  });

  it("Should return the day of the week if the difference is less than a week", () => {
    const randomDayFromLastWeek = Math.ceil(Math.random() * 6);
    const dayInLastWeek = 24 * 60 * 60 * 1000 * randomDayFromLastWeek;
    const date = new Date(Date.now() - dayInLastWeek);
    expect(getRelativeTime(date.toISOString())).toBe(weekDays[date.getDay()]);
  });

  it("Should return the full date if the difference is a week or more", () => {
    const dayInLastWeek = 7 * 24 * 60 * 60 * 1000;
    const date = new Date(Date.now() - dayInLastWeek);
    expect(getRelativeTime(date.toISOString())).toBe(date.toLocaleDateString());
  });
});
