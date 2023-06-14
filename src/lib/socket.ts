import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_SOCKET_URL
    : process.env.DEV_SOCKET_URL;

if (!URL) throw new Error("Missing SOCKET_URL in the environment variables");

export const socket = io(URL);
