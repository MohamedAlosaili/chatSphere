import { lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useRoomContext } from "@/context/RoomContext";
import LoadingSpinner from "@/features/RoomWindow/LoadingSpinner";

const Chat = lazy(() => import("./Chat"));

const RoomWindow = () => {
  const { activeRoom } = useRoomContext();

  return (
    <div className="absolute left-full top-0 flex items-center justify-center bg-bcolor-2 md:static">
      <Suspense fallback={<LoadingSpinner />}>
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
