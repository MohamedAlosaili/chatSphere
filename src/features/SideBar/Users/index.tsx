import useDocuments from "@/hooks/useDocuments";
import UserCard from "./UserCard";
import Search from "@/components/Search";
import UsersList from "./UsersList";
import { CardsSkeleton } from "@/components/Card";

// Types
import { TUser } from "@/types";

interface UsersProps {
  online: {
    users: TUser[] | undefined;
    loading: boolean;
    update: (nextPage: boolean) => void;
    total: number;
  };
}

const Users = ({ online }: UsersProps) => {
  const [offlineUsers, offlineLoading, offLineUpdate, offlineTotal] =
    useDocuments<TUser>("/api/users/offline");

  return (
    <div>
      {/* TODO: Add Sreach component */}
      <UsersList label="online" total={online.total} open>
        {online.loading ? (
          <CardsSkeleton size={5} />
        ) : online.users && online.users?.length > 0 ? (
          online.users.map(user => <UserCard key={user._id} user={user} />)
        ) : (
          <h4 className="my-8 text-center text-tcolor">No one is online now</h4>
        )}
      </UsersList>
      <UsersList label="offline" total={offlineTotal}>
        {offlineLoading ? (
          <CardsSkeleton size={5} />
        ) : (
          offlineUsers &&
          offlineUsers.map(user => <UserCard key={user._id} user={user} />)
        )}
      </UsersList>
    </div>
  );
};

const calcTotalUsers = (
  online: number | undefined,
  offline: number | undefined
) => {
  let total = 0;

  if (online) total += online;
  if (offline) total += offline;

  return total;
};

export default Users;
