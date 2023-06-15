import { fetcher } from "@/lib/fetcher";
import { TUser } from "@/types";
import { useEffect } from "react";

const useUserStatus = (user: TUser, setUser: (user: TUser) => void) => {
  useEffect(() => {
    changeUserState(user._id, "online");
    // window.addEventListener("close", offlineListener);
    // window.addEventListener("blur", offlineListener);
    // window.addEventListener("focus", onlineListener);

    return () => {
      changeUserState(user._id, "offline");
      // window.removeEventListener("blur", offlineListener);
      // window.removeEventListener("focus", onlineListener);
    };
  }, []);

  const changeUserState = async (id: string, state: "online" | "offline") => {
    fetcher<TUser>(`/api/auth/${state}`, { method: "PUT", data: { id } }).then(
      res => {
        if (res.data) setUser(res.data);
      }
    );
  };
};

export default useUserStatus;
