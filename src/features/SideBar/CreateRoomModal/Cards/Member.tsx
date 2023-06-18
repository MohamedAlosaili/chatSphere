import { TUser } from "@/types";

interface MemberProps {
  member: TUser;
  updateMembers?: (member: TUser) => void;
}

const Member = ({ member, updateMembers }: MemberProps) => (
  <div className="group relative w-fit cursor-pointer overflow-hidden rounded-xl bg-accent/30 p-2 text-xs">
    {member.username}
    <div
      className="absolute inset-0 bg-bcolor opacity-0 transition-opacity group-hover:opacity-100"
      onClick={() => updateMembers && updateMembers(member)}
    >
      <span className="grid h-full w-full place-items-center bg-accent/40 text-xl">
        ×
      </span>
    </div>
  </div>
);

export default Member;
