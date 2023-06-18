import { useEffect } from "react";

import useDocuments from "@/hooks/useDocuments";

// Types
import { TUser } from "@/types";

const useOnlineUsers = () => {
  const [users, loading, update, total] =
    useDocuments<TUser>("/api/users/online");

  useEffect(() => {
    // TODO: Add listener and cleaner for online socket event
  }, []);

  return { users, loading, update, total };
};

export default useOnlineUsers;
