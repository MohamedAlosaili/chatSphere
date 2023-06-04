import { User } from "@/types";

export const newUser = (email: string): Omit<User, "_id"> => {
  const name = email.split("@")[0];

  return {
    name,
    username: name,
    email,
    isOnline: false,
    createdAt: new Date(Date.now()),
  };
};
