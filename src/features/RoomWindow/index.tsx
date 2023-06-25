import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useRoomContext } from "@/context/RoomContext";

const Chat = lazy(() => import("./Chat"));

// const delay = (file: any) => {
//   return new Promise((res, rej) =>
//     setTimeout(() => res(file), 5000)
//   ) as Promise<{ default: ComponentType<any> }>;
// };

const RoomWindow = () => {
  const { activeRoom } = useRoomContext();

  return (
    <div className="absolute left-full top-0 flex items-center justify-center bg-bcolor-2 md:static">
      {/* TODO: add fallback loader */}
      <Suspense fallback={"loading..."}>
        <AnimatePresence mode="wait">
          {activeRoom ? (
            <Chat key={activeRoom._id} />
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="m-2 hidden rounded-xl bg-accent/20 px-3 py-2 text-tcolor md:block"
            >
              Select a room to start messaging...
            </motion.p>
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default RoomWindow;
