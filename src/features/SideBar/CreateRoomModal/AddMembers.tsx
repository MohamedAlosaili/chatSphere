import { useState } from "react";

import useDocuments from "@/hooks/useDocuments";
import Scrollable from "@/components/Scrollable";
import Button from "@/components/Button";
import Search, { useSearch, NoResult } from "@/features/Search";
import { Member, User } from "./Cards";

// Types
import { Dispatch, SetStateAction } from "react";
import { TUser } from "@/types";

interface AddMembersProps {
  members: TUser[];
  setMembers: Dispatch<SetStateAction<TUser[]>>;
}

const AddMembers = ({ members, setMembers }: AddMembersProps) => {
  const [users, usersLoading, update, total] =
    useDocuments<TUser>("/api/users/online");

  const [[result, submittedValue, nextPage, totalSearch], search] =
    useSearch<TUser>("users");

  const [showSearch, setShowSearch] = useState(false);
  const showUsersFromSearch = showSearch && submittedValue;

  const usersToDisplay = showUsersFromSearch ? result : users;
  const totalUsers = showUsersFromSearch ? totalSearch : total;
  const more = () => (showUsersFromSearch ? nextPage() : update(true));

  const moreListToLoad =
    usersToDisplay.length > 0 && totalUsers > usersToDisplay?.length;

  const updateMembers = (newMember: TUser) => {
    const isExist = members.some(member => member._id === newMember._id);

    if (isExist) {
      setMembers(prevMembers =>
        prevMembers.filter(member => member._id !== newMember._id)
      );
    } else {
      setMembers(prevMembers => [...prevMembers, newMember]);
    }
  };

  return (
    <>
      <h3 className="font-medium">
        Members <span>{`(${members.length})`}</span>{" "}
      </h3>
      <div className="flex flex-wrap gap-1">
        {members?.map(member => (
          <Member
            key={member._id}
            member={member}
            updateMembers={updateMembers}
          />
        ))}
      </div>

      <h3 className="flex items-center font-medium">
        Select from online users{" "}
        <Button
          className="mx-0 ml-auto min-h-[auto] rounded-lg px-2 py-1 text-xs"
          onClick={() => setShowSearch(prev => !prev)}
        >
          {showSearch ? "Hide Search" : "Show Search"}
        </Button>
      </h3>
      {showSearch && <Search placeholder="Search in users..." {...search} />}

      <div className="h-40 rounded-xl border-2 border-accent/20 p-2">
        <Scrollable>
          {usersToDisplay.map(user => (
            <User
              key={user._id}
              user={user}
              members={members}
              updateMembers={updateMembers}
            />
          ))}
          {moreListToLoad && (
            <Button onClick={more} className="min-h-fit w-3/4">
              {usersLoading ? "Loading..." : "More"}
            </Button>
          )}
          {usersToDisplay.length === 0 &&
            (showUsersFromSearch ? (
              <NoResult value={submittedValue} />
            ) : (
              <p className="mt-4 text-center text-tcolor">
                No one is online now. Try searching
              </p>
            ))}
        </Scrollable>
      </div>
    </>
  );
};

export default AddMembers;
