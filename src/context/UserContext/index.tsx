import React, { ReactNode, useContext, useState } from "react";

import useUserStatus from "./useUserStatus";
import { fetcher } from "@/lib/fetcher";
import { toast } from "react-toastify";

import { TUser } from "@/types";

interface TUserContext {
  user: TUser | null;
  updateCurrentUser: () => Promise<void>;
}

const UserContext = React.createContext<TUserContext>({
  user: null,
  updateCurrentUser: async () => {},
});

interface Props {
  user: TUser;
  children: ReactNode;
}

const UserContextProvider = (props: Props) => {
  const [user, setUser] = useState<TUser>({ ...props.user });
  useUserStatus(user, setUser);
  if (!user) {
    return <div>Loading...</div>;
  }

  const updateCurrentUser = async () => {
    const result = await fetcher<TUser>("/api/auth/currentUser");
    if (result.success && result.data) {
      setUser(result.data);
    } else {
      toast.error("Failed to update user information!");
    }
  };

  return (
    <UserContext.Provider value={{ user, updateCurrentUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
