import Image from "@/components/Image";
import SkeletonLoader from "@/components/SkeletonLoader";
import getUserPhoto from "@/utils/getPhoto";

interface MemberCardProps {
  username: string;
  photo: string;
  label?: string;
}

const MemberCard = ({ username, photo, label }: MemberCardProps) => (
  <div className="group flex items-center gap-4 px-4 first:pt-1 last:pb-1">
    <Image
      src={getUserPhoto(photo)}
      alt={`${username} photo`}
      className="aspect-square w-10 rounded-xl"
    />
    <div className="flex h-16 flex-1 items-center gap-2 overflow-hidden border-b border-accent/20 group-last:border-0">
      <h4 className="flex-1 truncate">{username}</h4>
      {label && (
        <span className="text-sm font-medium capitalize text-tcolor-2">
          {label}
        </span>
      )}
    </div>
  </div>
);

export const MemberCardSkeletonLoader = () => (
  <div className="flex items-center gap-4 py-2">
    <SkeletonLoader className="" />
    <SkeletonLoader />
  </div>
);

export default MemberCard;
