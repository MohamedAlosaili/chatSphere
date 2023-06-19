import { fetcher } from "@/lib/fetcher";
import { socket } from "@/lib/socket";
import { TUser } from "@/types";
import { useEffect } from "react";

const useUserStatus = (user: TUser, setUser: (user: TUser) => void) => {
  useEffect(() => {
    changeUserStatus(user._id, "online");
    // window.addEventListener("close", offlineListener);
    window.addEventListener("blur", offlineListener);
    window.addEventListener("focus", onlineListener);

    return () => {
      changeUserStatus(user._id, "offline");
      window.removeEventListener("blur", offlineListener);
      window.removeEventListener("focus", onlineListener);
    };
  }, []);

  const onlineListener = () => changeUserStatus(user._id, "online");
  const offlineListener = () => changeUserStatus(user._id, "offline");

  const changeUserStatus = async (id: string, status: "online" | "offline") => {
    await fetcher<TUser>(`/api/auth/${status}`, {
      method: "PUT",
      data: { id },
    }).then(res => {
      if (res.data) {
        setUser(res.data);
        socket.emit("update online");
      }
    });
  };
};

export default useUserStatus;
