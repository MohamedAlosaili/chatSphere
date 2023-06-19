import { lazy, Suspense } from "react";
import { useRoomContext } from "@/context/RoomContext";

const Chat = lazy(() => import("./Chat"));

const RoomWindow = () => {
  const { activeRoom } = useRoomContext();

  return (
    <div className="flex items-center justify-center bg-bcolor-2">
      {/* TODO: add fallback loader */}
      {activeRoom ? (
        <Suspense fallback={""}>
          <Chat key={activeRoom._id} />
        </Suspense>
      ) : (
        <p className="m-2 rounded-xl bg-accent/20 px-3 py-2 text-tcolor">
          Select a room to start messaging...
        </p>
      )}
    </div>
  );
};

export default RoomWindow;
