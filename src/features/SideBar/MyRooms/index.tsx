import { BsWind } from "react-icons/bs";

import useDocuments from "@/hooks/useDocuments";
import Search, { useSearch, NoResult } from "@/features/Search";
import RoomCard from "./RoomCard";
import Button from "@/components/Button";
import { CardsSkeleton } from "@/components/Card";

// Types
import { Dispatch, SetStateAction } from "react";
import { TRoom } from "@/types";
import { Tap } from "../types";

interface MyRoomsProps {
  setActiveTap: Dispatch<SetStateAction<Tap>>;
}

const MyRooms = ({ setActiveTap }: MyRoomsProps) => {
  const [rooms, loading, update, total] =
    useDocuments<TRoom>("/api/rooms/joined");
  const [[result, searchValue, nextPage, totalSearch], search] =
    useSearch<TRoom>("rooms/joined");

  return (
    <div>
      <Search
        placeholder="Search in my rooms..."
        results={result.length}
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
                  <RoomCard key={room._id} room={room} />
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
                <RoomCard key={room._id} room={room} />
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
                You do not have any rooms <BsWind size={25} />
              </h3>
              <Button onClick={() => setActiveTap("public rooms")}>
                Discover public rooms
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRooms;
