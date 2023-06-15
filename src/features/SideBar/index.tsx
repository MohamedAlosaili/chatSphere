import { Suspense, lazy, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Scrollable from "@/components/Scrollable";
import Navbar from "./Navbar";

// Types
import { Tap } from "./types";

const Profile = lazy(() => import("./Profile"));
const MyRooms = lazy(() => import("./MyRooms"));
const PublicRooms = lazy(() => import("./PublicRooms"));
const Users = lazy(() => import("./Users"));

const fadeLeftVariants = {
  hidden: {
    x: "-25%",
    opacity: 0,
  },
  visible: {
    x: "0%",
    opacity: 1,
  },
};

const Sidebar = () => {
  const [activeTap, setActiveTap] = useState<Tap>("my rooms");

  const currentTap = (activeTap: Tap) => {
    switch (activeTap) {
      case "profile":
        return <Profile />;
      case "my rooms":
        return <MyRooms />;
      case "public rooms":
        return <PublicRooms />;
      case "users":
        return <Users />;
      default:
        return <MyRooms />;
    }
  };

  return (
    <div className="relative flex h-screen border-r border-accent/25 bg-bcolor-2 pr-2">
      <Navbar activeTap={activeTap} setActiveTap={setActiveTap} />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeTap}
          variants={fadeLeftVariants}
          initial="hidden"
          animate="visible"
          className="h-[calc(100%-50px)] flex-1"
        >
          <Scrollable className="h-full w-full px-4 py-8">
            <Suspense fallback={""}>{currentTap(activeTap)}</Suspense>
          </Scrollable>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
