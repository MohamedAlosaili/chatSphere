import { Suspense, lazy, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiMessageSquareAdd } from "react-icons/bi";

import useOnlineUsers from "./useOnlineUsers";
import Navbar from "./Navbar";
import CreateRoomModal from "@/features/RoomModal";
import Scrollable from "@/components/Scrollable";
import Button from "@/components/Button";
import LoadingSpinner from "./LoadingSpinner";
import ToolTip from "@/components/ToolTip";

// Types
import { TUser } from "@/types";
import { Tap, ToggleModalOptions } from "./types";

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
  const online = useOnlineUsers();

  const [activeTap, setActiveTap] = useState<Tap>("my rooms");
  const [createRoomModal, setCreateRoomModal] = useState<{
    show: boolean;
    selectedUser?: TUser;
  }>({ show: false });

  const toggleCreateRoomModal = (options?: ToggleModalOptions) => {
    options?.redirect && setActiveTap("my rooms");
    setCreateRoomModal(prev => ({
      show: options?.show != null ? options.show : !prev.show,
      selectedUser: options?.selectedUser,
    }));
  };

  const currentTap = (activeTap: Tap) => {
    switch (activeTap) {
      case "profile":
        return <Profile />;
      case "my rooms":
        return <MyRooms setActiveTap={setActiveTap} />;
      case "public rooms":
        return (
          <PublicRooms
            toggleCreateRoomModal={toggleCreateRoomModal}
            setActiveTap={setActiveTap}
          />
        );
      case "users":
        return (
          <Users
            online={online}
            toggleCreateRoomModal={toggleCreateRoomModal}
          />
        );
      default:
        return <MyRooms setActiveTap={setActiveTap} />;
    }
  };

  return (
    <div className="relative flex h-screen border-r border-accent/25 bg-bcolor-2">
      <Navbar
        activeTap={activeTap}
        setActiveTap={setActiveTap}
        onlineUsers={online.users.length}
      />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeTap}
          variants={fadeLeftVariants}
          initial="hidden"
          animate="visible"
          className="h-[calc(100%-50px)] flex-1 pr-1"
        >
          <Scrollable hide className="h-full w-full px-4 py-8 pr-2">
            <Suspense fallback={<LoadingSpinner />}>
              {currentTap(activeTap)}
            </Suspense>
          </Scrollable>
        </motion.div>
      </AnimatePresence>
      {activeTap === "my rooms" && (
        <Button
          className="group absolute bottom-24 right-5 px-3 lg:bottom-8"
          onClick={() => toggleCreateRoomModal({ show: true })}
        >
          <BiMessageSquareAdd size={25} />
          <ToolTip position="left" text="New Room" />
        </Button>
      )}
      <AnimatePresence>
        {createRoomModal.show && (
          <CreateRoomModal
            close={toggleCreateRoomModal}
            selectedUser={createRoomModal.selectedUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
