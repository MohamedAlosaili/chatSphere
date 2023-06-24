import { ReactNode } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import { useUserContext } from "@/context/UserContext";
import useDocuments from "@/hooks/useDocuments";
import MemberCard, { MemberCardSkeletonLoader } from "./MemberCard";
import { roomMembers } from "./util";

import { TMember, TRoom } from "@/types";

interface MembersProps {
  room: TRoom;
  children: (currentUserIsRoomOwner: boolean) => ReactNode;
}

const Members = ({ room, children }: MembersProps) => {
  const { user } = useUserContext();
  const [membersResult, loading, update, totalMembers] = useDocuments<TMember>(
    `/api/rooms/${room._id}/members?sort=_id`
  );

  const showSeeMore = membersResult.length < totalMembers;
  const { roomOwner, members, currentUserIsRoomOwner } = roomMembers(
    room.roomOwner,
    membersResult,
    user
  );

  return (
    <>
      <div className="flex-1">
        <h3 className="mb-2 mt-4">Members</h3>
        <div className="overflow-hidden rounded-xl bg-accent/10">
          {loading && members.length === 0 ? (
            <MemberCardSkeletonLoader />
          ) : (
            <>
              <MemberCard
                username="You"
                photo={user?.photo!}
                label={currentUserIsRoomOwner ? "Owner" : undefined}
              />
              {!currentUserIsRoomOwner && roomOwner && (
                <MemberCard
                  username={roomOwner.username}
                  photo={roomOwner.photo}
                  label="Owner"
                />
              )}
              {members.map(member => (
                <MemberCard key={member._id} {...member.memberId} />
              ))}
              {showSeeMore && (
                <button
                  className="flex h-16 w-full items-center justify-between gap-2 overflow-hidden border-accent/20 px-4 text-sm transition-colors hover:bg-accent/5"
                  onClick={() => update(true)}
                >
                  See more <MdOutlineArrowForwardIos size={20} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {children(currentUserIsRoomOwner)}
    </>
  );
};

export default Members;
