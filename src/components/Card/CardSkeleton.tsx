import SkeletonLoader from "@/components/SkeletonLoader";

const CardSkeleton = () => (
  <div className="grid grid-cols-[3.5rem,_1fr,_4rem] items-center gap-4 rounded-xl p-4">
    <SkeletonLoader className="aspect-square w-14 rounded-xl" />
    <div className="flex flex-col justify-center gap-2">
      <SkeletonLoader className="h-4 w-11/12 rounded-xl" />
      <SkeletonLoader className="h-2 w-9/12 rounded-xl" />
    </div>
    <SkeletonLoader className="h-3 w-12 rounded-xl" />
  </div>
);

export default CardSkeleton;
