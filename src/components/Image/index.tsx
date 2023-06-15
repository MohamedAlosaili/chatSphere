import { StyleHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

import { TbFaceIdError } from "react-icons/tb";
import { AiOutlineReload } from "react-icons/ai";

import SkeletonLoader from "@/components/SkeletonLoader";

interface Props {
  src: string;
  alt: string;
  className?: string;
  style?: StyleHTMLAttributes<HTMLImageElement>;
}

function Image({ src, alt, className = "", style }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadNum, setReloadNum] = useState(0);

  const reload = () => {
    setLoading(true);
    setError(false);
    setReloadNum(prevNum => prevNum + 1);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <picture
      onClick={e => (error || loading) && reloadNum < 3 && e.preventDefault()}
      className={twMerge(
        `block h-full overflow-hidden ${!loading ? "bg-accent/25" : ""} ${
          error ? "cursor-auto" : ""
        }`,
        className
      )}
    >
      {loading && <SkeletonLoader className={className} />}
      {error && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1">
          <button
            onClick={() => (reloadNum < 3 ? reload() : null)}
            className="relative"
          >
            <TbFaceIdError className="text-[1.5em]" />
            {reloadNum < 3 && (
              <AiOutlineReload className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 transform text-[2em]" />
            )}
          </button>
        </div>
      )}
      <img
        // To re-render img again
        key={String(Math.random())}
        src={src}
        alt={alt}
        style={style}
        className={`h-full w-full bg-[var(--color)] object-cover ${
          loading || error ? "hidden" : "block"
        }`}
        onLoad={() => setLoading(false)}
        onError={handleError}
      />
    </picture>
  );
}

export default Image;
