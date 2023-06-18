import useDocuments from "@/hooks/useDocuments";
import UserCard from "./UserCard";
import Search, { useSearch, NoResult } from "@/features/Search";
import Button from "@/components/Button";
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
  const [offlineUsers, offlineLoading, updateOffline, offlineTotal] =
    useDocuments<TUser>("/api/users/offline");
  const [[result, searchValue, nextPage, totalSearch], search] =
    useSearch<TUser>("users");

  return (
    <div>
      <Search
        placeholder="Search in users..."
        results={result.length}
        {...search}
      />
      {searchValue ? (
        search.loading && result.length === 0 ? (
          <CardsSkeleton size={5} />
        ) : (
          <>
            {result.length > 0 ? (
              <>
                {result.map(user => (
                  <UserCard
                    key={user._id}
                    user={user}
                    showCreateRoomModal={toggleCreateRoomModal}
                  />
                ))}
                {totalSearch > result.length && (
                  <Button onClick={nextPage} className="w-3/4">
                    {search.loading ? "Loading..." : "More"}
                  </Button>
                )}
              </>
            ) : (
              <NoResult value={searchValue} className="mt-8" />
            )}
          </>
        )
      ) : (
        <>
          <UsersList label="online" total={online.total} open>
            {online.loading && online.users.length === 0 ? (
              <CardsSkeleton size={5} />
            ) : online.users.length > 0 ? (
              <>
                {online.users.map(user => (
                  <UserCard
                    key={user._id}
                    user={user}
                    showCreateRoomModal={toggleCreateRoomModal}
                  />
                ))}
                {online.total > online.users.length && (
                  <Button onClick={() => online.update(true)} className="w-3/4">
                    {online.loading ? "Loading..." : "More"}
                  </Button>
                )}
              </>
            ) : (
              <h4 className="my-8 text-center text-tcolor">
                No one is online now
              </h4>
            )}
          </UsersList>
          <UsersList label="offline" total={offlineTotal}>
            {offlineLoading && offlineUsers.length === 0 ? (
              <CardsSkeleton size={5} />
            ) : (
              <>
                {offlineUsers.map(user => (
                  <UserCard
                    key={user._id}
                    user={user}
                    showCreateRoomModal={toggleCreateRoomModal}
                  />
                ))}
                {offlineUsers.length > 0 &&
                  offlineTotal > offlineUsers.length && (
                    <Button
                      onClick={() => updateOffline(true)}
                      className="w-3/4"
                    >
                      {offlineLoading ? "Loading..." : "More"}
                    </Button>
                  )}
              </>
            )}
          </UsersList>
        </>
      )}
    </div>
  );
};

export default Users;
