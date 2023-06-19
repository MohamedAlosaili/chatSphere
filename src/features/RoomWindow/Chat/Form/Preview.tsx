import { Dispatch, SetStateAction, memo } from "react";
import { motion } from "framer-motion";

import Image from "@/components/Image";
import Video from "@/components/Video";

interface Props {
  file: File;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  loading: boolean;
}

const Preview = ({ file, setFile, loading }: Props) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute bottom-full w-full rounded-xl"
  >
    {file.type.startsWith("image") ? (
      <Image
        src={URL.createObjectURL(file)}
        alt="Message preview"
        className="relative z-10 aspect-square rounded-xl"
      />
    ) : (
      <Video
        url={URL.createObjectURL(file)}
        type={file.type}
        className="relative z-10 rounded-xl"
        controls={true}
      />
    )}
    <button
      disabled={loading}
      className="absolute bottom-full left-1/2 -mb-2 aspect-square w-12 -translate-x-1/2 rounded-xl bg-accent/75 text-5xl leading-[48px]"
      onClick={() => setFile(undefined)}
    >
      <span className="-mt-1 block">×</span>
    </button>
    {loading && (
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-bcolor/60 text-2xl">
        Sending...
      </div>
    )}
  </motion.div>
);

export default memo(Preview);
