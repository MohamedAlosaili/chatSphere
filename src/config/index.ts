const dev = process.env.NODE_ENV !== "production";

const DEV_API_URL = process.env.DEV_API_URL;
const PROD_API_URL = process.env.PROD_API_URL;

if ((dev && !DEV_API_URL) || (!dev && !PROD_API_URL)) {
  throw new Error("Invalid/Missing API_URL variable in .env");
}

export const API_URL = (dev ? DEV_API_URL : PROD_API_URL) as string;
