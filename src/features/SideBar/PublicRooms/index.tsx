import useDocuments from "@/hooks/useDocuments";
import Button from "@/components/Button";
import RoomCard from "./RoomCard";
import Search, { useSearch, NoResult } from "@/features/Search";
import { CardsSkeleton } from "@/components/Card";

// Types
import { Dispatch, SetStateAction } from "react";
import { ToggleModalOptions, Tap } from "../types";
import { TRoom } from "@/types";

interface PublicRoomsProps {
  toggleCreateRoomModal: (options?: ToggleModalOptions) => void;
  setActiveTap: Dispatch<SetStateAction<Tap>>;
}

const PublicRooms = ({
  toggleCreateRoomModal,
  setActiveTap,
}: PublicRoomsProps) => {
  const [rooms, loading, update, total] = useDocuments<TRoom>("/api/rooms");
  const [[result, searchValue, nextPage, totalSearch], search] =
    useSearch<TRoom>("rooms");

  return (
    <div>
      <Search
        placeholder="Search in public rooms..."
        result={result.length}
        {...search}
      />
      {searchValue ? (
        search.loading && result.length === 0 ? (
          <CardsSkeleton size={5} />
        ) : (
          <>
            {result.length > 0 ? (
              <>
                {result.map(room => (
                  <RoomCard
                    key={room._id}
                    room={room}
                    setActiveTap={setActiveTap}
                  />
                ))}
                {totalSearch > result.length && (
                  <Button onClick={nextPage} className="w-3/4">
                    {search.loading ? "Loading..." : "More"}
                  </Button>
                )}
              </>
            ) : (
              <NoResult value={searchValue} className="mt-8" />
            )}
          </>
        )
      ) : (
        <div className="pt-4">
          {loading && rooms.length === 0 ? (
            <CardsSkeleton size={5} />
          ) : rooms.length > 0 ? (
            <>
              {rooms.map(room => (
                <RoomCard
                  key={room._id}
                  room={room}
                  setActiveTap={setActiveTap}
                />
              ))}
              {total > rooms.length && (
                <Button onClick={() => update(true)} className="w-3/4">
                  {loading ? "Loading..." : "More"}
                </Button>
              )}
            </>
          ) : (
            <>
              <h3 className="font-lg mb-4 mt-8 flex items-center justify-center gap-4 text-tcolor">
                There are no public rooms available to join
              </h3>
              <Button onClick={() => toggleCreateRoomModal()}>
                Create your own room
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PublicRooms;
