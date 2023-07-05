import { fetcher } from "../fetcher";
import { expect, test } from "vitest";

const server = "http://localhost:3000";

test("Should successfully send a login link", async () => {
  const response = await fetcher<null>(`${server}/api/auth/login`, {
    method: "POST",
    data: { email: "mohamed@gmail.com" },
  });

  expect(response).toEqual({
    success: true,
    data: null,
    message: "Email sent successfully",
  });
});

test("Should failed, because url not provided", async () => {
  const response = await fetcher("");

  expect(response.success).toBe(false);
  expect(response.error).toBeDefined();
});

test("Should failed, because email not provided", async () => {
  const response = await fetcher<null>(`${server}/api/auth/login`, {
    method: "POST",
  });

  expect(response.success).toBe(false);
  expect(response.error).toBeDefined();
});
