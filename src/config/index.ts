const dev = process.env.NODE_ENV !== "production";

const DEV_SERVER = process.env.DEV_SERVER;
const PROD_SERVER = process.env.PROD_SERVER;

const DEV_API_URL = process.env.DEV_API_URL;
const PROD_API_URL = process.env.PROD_API_URL;

if (dev && (!DEV_SERVER || !DEV_API_URL)) {
  throw new Error("Invalid/Missing URL variables in .env.local");
}

export const SERVER_URL = (dev ? DEV_SERVER : PROD_SERVER) as string;
export const API_URL = (dev ? DEV_API_URL : PROD_API_URL) as string;
