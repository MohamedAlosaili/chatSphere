import { serialize, parse } from "cookie";
import { ClientRequest, ServerResponse } from "http";
import { GetServerSidePropsContext } from "next";

const TOKEN_EXPIRE = 30 * 24 * 60 * 60 * 1000; // 1 month
const TOKEN_NAME = "token";

export const setTokenCookie = (res: ServerResponse, token: string) => {
  const cookie = serialize(TOKEN_NAME, token, {
    expires: new Date(Date.now() + TOKEN_EXPIRE),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const removeTokenCookie = (res: ServerResponse) => {
  const cookie = serialize(TOKEN_NAME, "none", {
    expires: new Date(Date.now()),
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};

const parseCookie = (req: GetServerSidePropsContext["req"]) => {
  if (req.cookies) return req.cookies;

  const cookie = req.headers.cookie;
  return parse(cookie || "");
};

export const getTokenCookie = (req: GetServerSidePropsContext["req"]) => {
  const token = parseCookie(req);

  return token[TOKEN_NAME];
};
