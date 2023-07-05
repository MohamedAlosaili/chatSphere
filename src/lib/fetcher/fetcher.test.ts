import { fetcher } from ".";
import { expect, test } from "vitest";

const server = "http://localhost:3000";

// Comment this test to prevent unnecessary calls after the test is passed

// test("Should successfully send a login link", async () => {
//   const response = await fetcher<null>(`${server}/api/auth/login`, {
//     method: "POST",
//     data: { email: "mohamed@gmail.com" },
//   });

//   expect(response).toEqual({
//     success: true,
//     data: null,
//     message: "Email sent successfully",
//   });
// });

test("Should return unsuccessful response, because url not provided", async () => {
  const response = await fetcher("");

  expect(response.success).toBe(false);
  expect(response.error).toBeDefined();
});

test("Should return unsuccessful response, because email not provided", async () => {
  const response = await fetcher<null>(`${server}/api/auth/login`, {
    method: "POST",
  });

  expect(response.success).toBe(false);
  expect(response.error).toBeDefined();
});
