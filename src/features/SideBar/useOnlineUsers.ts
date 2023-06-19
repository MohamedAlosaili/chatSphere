import useDocuments from "@/hooks/useDocuments";
import useSocketListener from "@/hooks/useSocketListener";

// Types
import { TUser } from "@/types";

const useOnlineUsers = () => {
  const [users, loading, update, total] =
    useDocuments<TUser>("/api/users/online");
  useSocketListener("update online", update);

  return { users, loading, update, total };
};

export default useOnlineUsers;
