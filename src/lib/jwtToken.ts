import jwt, { SignOptions } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("Missing JWT_SECRET environment variable");
}

export const verifyJwtToken = <T = { id: string }>(token: string) => {
  return jwt.verify(token, jwtSecret) as T;
};

export const signJwtToken = (
  payload: string | Buffer | object,
  options?: SignOptions
) => {
  return jwt.sign(payload, jwtSecret, options);
};
