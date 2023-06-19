import { useState, ComponentProps, RefObject } from "react";

import { TbFaceIdError } from "react-icons/tb";
import { AiOutlineReload } from "react-icons/ai";

import SkeletonLoader from "@/components/SkeletonLoader";

interface Props extends ComponentProps<"video"> {
  url: string;
  type: string;
  videoRef?: RefObject<HTMLVideoElement>;
  autoPlay?: boolean;
}

const Video = ({
  url,
  type,
  className,
  videoRef,
  autoPlay,
  ...props
}: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const reload = () => {
    setLoading(true);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div
      onClick={e => (error || loading) && e.stopPropagation()}
      className={`aspect-video h-full overflow-hidden ${
        error ? "cursor-auto" : ""
      } ${className ?? ""}`}
    >
      {loading && <SkeletonLoader className={className} />}
      {error && (
        <div className="relative z-50 flex h-full w-full flex-col items-center justify-center gap-1 bg-accent/25">
          <button onClick={reload} className="relative">
            <TbFaceIdError className="text-[1.5em]" />
            <AiOutlineReload className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 transform text-[2em]" />
          </button>
        </div>
      )}
      <video
        key={String(Math.random())}
        ref={videoRef}
        autoPlay={autoPlay}
        muted
        onLoadedData={() => setLoading(false)}
        onError={handleError}
        className={`h-full w-full ${loading || error ? "hidden" : "block"}`}
        {...props}
      >
        <source src={`${url}#t=0.5`} type={`${type}`} />
        Your browser doesn&apos;t support video
      </video>
    </div>
  );
};

export default Video;
