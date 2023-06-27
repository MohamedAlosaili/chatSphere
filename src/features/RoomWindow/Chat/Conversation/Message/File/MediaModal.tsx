import { useState, useRef, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { AiFillPlayCircle } from "react-icons/ai";

import Backdrop from "@/components/Backdrop";

// Types
import { ReactNode, RefObject, MouseEventHandler } from "react";

interface MediaModalProps {
  type: "image" | "video";
  children: (videoRef?: RefObject<HTMLVideoElement>) => ReactNode;
}

const MediaModal = ({ type, children }: MediaModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleOpen: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    setIsOpen(isOpen => !isOpen);
  };

  useEffect(() => {
    if (type === "video" && videoRef.current) {
      if (!isOpen) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0.5;
        videoRef.current.controls = false;
      } else {
        videoRef.current.play();
        videoRef.current.controls = true;
      }
    }
  }, [isOpen, type]);

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && <Backdrop onClick={() => null} className="z-[100]" />}
      </AnimatePresence>
      <motion.div
        layout
        animate={
          isOpen
            ? { zIndex: 100 }
            : { zIndex: 20, transition: { zIndex: { delay: 0.3 } } }
        }
        data-isopen={isOpen}
        className={`relative grid cursor-pointer place-items-center data-[isopen=true]:fixed
        data-[isopen=true]:left-0 data-[isopen=true]:top-0 data-[isopen=true]:h-screen 
        data-[isopen=true]:w-screen 
        `}
        onClick={toggleOpen}
      >
        {type === "video" && !isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            data-isplayed={isOpen}
            className={`group absolute inset-0 z-10 grid place-items-center data-[isplayed=true]:invisible`}
          >
            <AiFillPlayCircle
              size={50}
              className={`text-accent transition-all group-hover:scale-125 group-active:scale-90`}
            />
          </motion.div>
        )}
        <motion.div
          layout
          animate={isOpen ? { borderRadius: "0" } : { borderRadius: "0.75rem" }}
          data-isopen={isOpen}
          onClick={e => isOpen && e.stopPropagation()}
          className={`relative w-full overflow-hidden rounded-xl data-[isopen=true]:max-h-[75vh] data-[isopen=true]:cursor-auto ${
            type === "image"
              ? "aspect-square object-cover data-[isopen=true]:aspect-auto sm:data-[isopen=true]:w-[30rem]"
              : "aspect-video sm:data-[isopen=true]:w-[40rem]"
          }`}
        >
          {type === "video" ? children(videoRef) : children()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MediaModal;
