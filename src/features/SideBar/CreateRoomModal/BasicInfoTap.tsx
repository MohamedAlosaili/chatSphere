import { useEffect, useMemo, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { LuFileEdit } from "react-icons/lu";

import Input from "@/components/Input";
import Image from "@/components/Image";
import InputFile from "@/components/InputFile";
import { Member } from "./Cards";

// Types
import { MutableRefObject, Dispatch, SetStateAction } from "react";
import { IndexSignature, TUser } from "@/types";
import Button from "@/components/Button";

export interface RoomInfo {
  name: string;
  private: boolean;
  file: File | undefined;
}

interface BasicTapProps {
  loading: boolean;
  roomInfoRef: MutableRefObject<RoomInfo>;
  members: TUser[];
  setTap: Dispatch<SetStateAction<"basic" | "members">>;
}

const BasicTap = ({ loading, roomInfoRef, members, setTap }: BasicTapProps) => {
  const [{ name }, setName] = useState<IndexSignature>({
    name: roomInfoRef.current.name ?? "",
  });
  const [file, setFile] = useState<File | undefined>(roomInfoRef.current.file);
  const [access, setAccess] = useState(roomInfoRef.current.private);

  useEffect(() => {
    roomInfoRef.current = { name, file, private: access };
  }, [name, file, access, roomInfoRef]);

  const preview = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  return (
    <>
      <div className="flex items-center gap-4">
        <InputFile
          disabled={loading}
          accept="image"
          setFile={setFile}
          className="relative mx-auto block aspect-square w-full shrink-0 basis-20 overflow-hidden rounded-xl"
        >
          <div
            className={`absolute inset-0 grid place-items-center transition-colors ${
              preview
                ? "group-hover:bg-bcolor/50"
                : "bg-bcolor-2/50 group-hover:bg-bcolor-2/25"
            }`}
            onClick={e => {
              preview && e.preventDefault();
              preview && setFile(undefined);
            }}
          >
            {preview ? (
              <CiSquareRemove
                size={35}
                className="stroke-1 opacity-0 transition-opacity group-hover:opacity-100"
              />
            ) : (
              <LuFileEdit
                size={25}
                className="transition-opacity group-hover:opacity-50"
              />
            )}
          </div>
          {preview && <Image src={preview} alt={`Photo preview of ${name}`} />}
        </InputFile>
        <Input
          name="name"
          value={name}
          setValue={setName}
          disabled={loading}
          placeholder="e.g. Wizard 🧙‍♂️"
          labelClassName="flex-1"
          className="w-full"
        />
      </div>
      <label className="relative flex cursor-pointer select-none items-center gap-2">
        <input
          type="checkbox"
          name="private"
          checked={access}
          onChange={() => setAccess(prev => !prev)}
        />
        Make room private ?
        <div onClick={e => e.preventDefault()}>
          <span className="peer grid h-5 w-5 place-items-center rounded-full border ">
            !
          </span>
          <div className="pointer-events-none absolute bottom-full left-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-2 overflow-hidden rounded-xl bg-bcolor opacity-0 transition-opacity peer-hover:opacity-100">
            <p className=" bg-accent/20 p-3">
              Rooms by default are public, anyone can join the room, whereas in
              private rooms only the room owner can add members.
            </p>
          </div>
        </div>
      </label>
      {members.length > 0 && (
        <>
          <h3 className="flex items-center">
            Members {`(${members.length})`}{" "}
            <Button
              className="mx-0 ml-auto min-h-[auto] rounded-lg px-2 py-1 text-xs"
              onClick={() => setTap("members")}
            >
              Add more
            </Button>
          </h3>
          <div className="flex flex-wrap gap-1">
            {members?.map(member => (
              <Member key={member._id} member={member} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default BasicTap;
