import { BsWind } from "react-icons/bs";

import useDocuments from "@/hooks/useDocuments";
import Search from "@/components/Search";
import RoomCard from "./RoomCard";
import Button from "@/components/Button";
import { CardsSkeleton } from "@/components/Card";

// Types
import { Dispatch, SetStateAction } from "react";
import { TRoom } from "@/types";
import { Tap } from "../types";

interface MyRoomProps {
  setActiveTap: Dispatch<SetStateAction<Tap>>;
}

const MyRooms = ({ setActiveTap }: MyRoomProps) => {
  const [rooms, loading, update] = useDocuments<TRoom>("/api/rooms/joined");

  return (
    <div>
      {/* TODO: Add Sreach component */}
      <div className="pt-4">
        {loading && <CardsSkeleton size={5} />}
        {rooms && rooms.length > 0 ? (
          rooms?.map(room => <RoomCard key={room._id} room={room} />)
        ) : (
          <>
            <h3 className="font-lg mb-4 mt-8 flex items-center justify-center gap-4 text-tcolor">
              You do not have any rooms <BsWind size={25} />
            </h3>
            <Button onClick={() => setActiveTap("public rooms")}>
              Discover public rooms
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyRooms;
