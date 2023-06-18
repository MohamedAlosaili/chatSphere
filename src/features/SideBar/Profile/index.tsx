import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Button from "@/components/Button";
import Image from "@/components/Image";
import UpdateProfileModal from "./UpdateProfileModal";
import { useUserContext } from "@/context/UserContext";
import getUserPhoto from "@/utils/getPhoto";
import Link from "next/link";

const Profile = () => {
  const { user, updateCurrentUser } = useUserContext();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div>
      <Image
        src={getUserPhoto(user!.photo)}
        alt={`${user!.username} photo`}
        className="mx-auto aspect-square w-32 rounded-2xl"
      />
      <h3 className="my-4 text-center text-lg font-medium text-white">
        @{user!.username}
      </h3>

      <div className="text-center">
        <p className="text-tcolor">Email: {user!.email}</p>
        <p>Joined at: {getDateAndTime(user!.createdAt)}</p>
      </div>

      <div className="mx-auto my-8 max-w-[min(90%,_20rem)]">
        <Button
          className="mb-4 w-full"
          onClick={() => setShowUpdateModal(true)}
        >
          Update Profile
        </Button>
        <Link href="/logout">
          <Button
            className="w-full border-rose-500 font-bold text-rose-500 hover:bg-rose-500/10"
            alt={true}
          >
            Logout
          </Button>
        </Link>
      </div>

      <AnimatePresence>
        {showUpdateModal && (
          <UpdateProfileModal
            user={user!}
            updateCurrentUser={updateCurrentUser}
            close={() => setShowUpdateModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const getDateAndTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const time = date.toTimeString();

  return `${date.toDateString()} - ${time.substring(0, 8)}`;
};

export default Profile;
