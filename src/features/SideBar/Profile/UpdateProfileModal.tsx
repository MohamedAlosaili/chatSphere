import { useMemo, useState } from "react";
import { LuFileEdit } from "react-icons/lu";
import { toast } from "react-toastify";

import Modal from "@/components/Modal";
import InputFile from "@/components/InputFile";
import Image from "@/components/Image";
import Input from "@/components/Input";
import getUserPhoto from "@/utils/getPhoto";
import { FetcherResponse, fetcher } from "@/lib/fetcher";

// Types
import { IndexSignature, TUser } from "@/types";

interface Props {
  user: TUser;
  updateCurrentUser: () => Promise<void>;
  close: () => void;
}

const UpdateProfileModal = ({ user, updateCurrentUser, close }: Props) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<IndexSignature>({
    username: user.username,
  });

  const preview = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  const updateProfile = async () => {
    const newUsername = userInfo.username.trim();

    if (!newUsername) {
      return toast.error("Username cannot be empty!");
    }

    const usernameIsSame = newUsername === user.username;

    if (usernameIsSame && !file) {
      return close();
    }

    const request: Promise<FetcherResponse>[] = [];

    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      request.push(
        fetcher("/api/auth/photo", { method: "PUT", data: formData })
      );
    }

    if (!usernameIsSame) {
      request.push(
        fetcher("/api/auth/info", {
          method: "PUT",
          data: { username: newUsername },
        })
      );
    }
    setLoading(true);
    const results = await Promise.all(request);

    if (results.every(res => res.success)) {
      await updateCurrentUser();

      toast.success("Profile Updated");
      close();
    } else {
      setLoading(false);
      toast.error("Failed to update Profile");
    }
  };

  return (
    <Modal
      loading={loading}
      close={close}
      actionName={loading ? "Updating..." : "Update"}
      actionHandler={updateProfile}
      title={{ text: "Update Profile" }}
    >
      <div>
        <InputFile
          disabled={loading}
          accept="image"
          setFile={setFile}
          className="relative mx-auto mb-4 block w-fit overflow-hidden rounded-2xl"
        >
          {!preview && (
            <div className="absolute inset-0 grid place-items-center bg-black/50 transition-colors group-hover:bg-black/25">
              <LuFileEdit size={25} />
            </div>
          )}

          <Image
            src={preview ?? getUserPhoto(user.photo)}
            alt={`${user.username} photo`}
            className="aspect-square w-24"
          />
        </InputFile>

        <Input
          name="username"
          label="Username"
          value={userInfo.username}
          setValue={setUserInfo}
          disabled={loading}
          placeholder="e.g. Mohamed"
        />
      </div>
    </Modal>
  );
};

export default UpdateProfileModal;
