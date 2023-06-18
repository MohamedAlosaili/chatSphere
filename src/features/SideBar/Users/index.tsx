import useDocuments from "@/hooks/useDocuments";
import UserCard from "./UserCard";
import Search from "@/components/Search";
import UsersList from "./UsersList";
import { CardsSkeleton } from "@/components/Card";

// Types
import { TUser } from "@/types";
import { ToggleModalOptions } from "../types";

interface UsersProps {
  online: {
    users: TUser[];
    loading: boolean;
    update: (nextPage: boolean) => void;
    total: number;
  };
  toggleCreateRoomModal: (options?: ToggleModalOptions) => void;
}

const Users = ({ online, toggleCreateRoomModal }: UsersProps) => {
  const [offlineUsers, offlineLoading, , offlineTotal] =
    useDocuments<TUser>("/api/users/offline");

  return (
    <div>
      {/* TODO: Add Sreach component */}
      <UsersList label="online" total={online.total} open>
        {online.loading ? (
          <CardsSkeleton size={5} />
        ) : online.users.length > 0 ? (
          online.users.map(user => (
            <UserCard
              key={user._id}
              user={user}
              showCreateRoomModal={toggleCreateRoomModal}
            />
          ))
        ) : (
          <h4 className="my-8 text-center text-tcolor">No one is online now</h4>
        )}
      </UsersList>
      <UsersList label="offline" total={offlineTotal}>
        {offlineLoading ? (
          <CardsSkeleton size={5} />
        ) : (
          offlineUsers.map(user => (
            <UserCard
              key={user._id}
              user={user}
              showCreateRoomModal={toggleCreateRoomModal}
            />
          ))
        )}
      </UsersList>
    </div>
  );
};

export default Users;
