import { useState, MutableRefObject } from "react";
import { toast } from "react-toastify";

import { useUserContext } from "@/context/UserContext";
import Modal, { RoomInfo } from "./Modal";
import { FetcherResponse, fetcher } from "@/lib/fetcher";
import { socket } from "@/lib/socket";

/// Types
import { TMember, TRoom, TUser } from "@/types";

interface UpdateRoomProps {
  close: () => void;
  room: TRoom & { members: TMember[] };
}

const UpdateRoom = ({ room, close }: UpdateRoomProps) => {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);

  const initialRoomInfo = {
    file: undefined,
    name: room.name,
    private: room.private,
  };
  const members = room.members
    .map(member => member.memberId)
    .filter(member => member._id !== user?._id);

  const updateRoom = async (
    roomInfoRef: MutableRefObject<RoomInfo>,
    newMembers: TUser[]
  ) => {
    const { file, name, ...info } = roomInfoRef.current;

    const addedMembers = newMembers
      .filter(
        newMember => !members.some(oldMember => oldMember._id === newMember._id)
      )
      .map(member => member._id);

    const removedMembers = members
      .filter(
        oldMember =>
          !newMembers.some(newMember => newMember._id === oldMember._id)
      )
      .map(member => member._id);

    if (
      addedMembers.length === 0 &&
      removedMembers.length === 0 &&
      !file &&
      name === initialRoomInfo.name &&
      info.private === initialRoomInfo.private
    ) {
      return close();
    }

    setLoading(true);
    const requests: Promise<FetcherResponse>[] = [];

    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      requests.push(
        fetcher(`/api/rooms/${room._id}/owner/photo`, {
          method: "PUT",
          data: formData,
        })
      );
    }

    if (
      name !== initialRoomInfo.name ||
      info.private !== initialRoomInfo.private
    ) {
      requests.push(
        fetcher(`/api/rooms/${room._id}/owner`, {
          method: "PUT",
          data: { name, private: info.private },
        })
      );
    }

    if (addedMembers.length > 0) {
      requests.push(
        fetcher(`/api/rooms/${room._id}/owner/members/add`, {
          method: "POST",
          data: { members: addedMembers },
        })
      );
    }

    if (removedMembers.length > 0) {
      requests.push(
        fetcher(`/api/rooms/${room._id}/owner/members/remove`, {
          method: "POST",
          data: { members: removedMembers },
        })
      );
    }

    const responses = await Promise.all(requests);

    setLoading(false);

    if (responses.every(res => res.success)) {
      toast.success("Room updated");
      socket.emit("update room", room._id, null, removedMembers);
      socket.emit("update messages", room._id);
      close();
    } else {
      toast.error("Failed to update room, try again later");
    }
  };

  return (
    <Modal
      type="update"
      close={close}
      loading={loading}
      roomPhoto={room.photo}
      initialRoomInfo={initialRoomInfo}
      initialMembers={members}
      roomModalActionHandler={updateRoom}
    />
  );
};

export default UpdateRoom;
