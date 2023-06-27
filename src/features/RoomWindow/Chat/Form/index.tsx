import { useState, useRef, useEffect, FormEvent, LegacyRef } from "react";
import { AnimatePresence } from "framer-motion";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

import { useRoomContext } from "@/context/RoomContext";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import Button from "@/components/Button";
import Preview from "./Preview";
import { fetcher } from "@/lib/fetcher";
import { socket } from "@/lib/socket";

// Types
import { IndexSignature } from "@/types";
import Backdrop from "@/components/Backdrop";

const Form = () => {
  const { activeRoom } = useRoomContext();
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState<IndexSignature<string>>({ text: "" });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (message.text === "") inputRef.current?.focus();
  }, [message.text]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append("content", message.text.trim());
    setLoading(true);
    const res = await fetcher(`/api/rooms/${activeRoom?._id}/messages`, {
      method: "POST",
      data: formData,
    });
    setLoading(false);

    if (res.success) {
      setMessage({ text: "" });
      setFile(undefined);
      socket.emit("update messages", activeRoom?._id);
    } else {
      return toast.error("Failed to send a message, try again");
    }
  };

  return (
    <>
      <AnimatePresence>
        {file && (
          <Backdrop
            onClick={() => setFile(undefined)}
            className="absolute z-20"
          />
        )}
      </AnimatePresence>
      <div className="sticky bottom-0 left-0 z-50 h-20 w-full shrink-0 border-t border-accent/25 bg-bcolor-2 p-4 text-tcolor">
        <div className="relative mx-auto max-w-4xl">
          <form onSubmit={sendMessage}>
            <Input
              inputRef={inputRef}
              name="text"
              value={message.text}
              setValue={setMessage}
              disabled={loading}
              placeholder="Type a message..."
              className="pr-24"
              autoComplete="off"
            />
            <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2 pr-3">
              <Button type="button" className="min-h-fit p-0">
                <InputFile
                  accept="image, video"
                  setFile={setFile}
                  disabled={loading}
                >
                  <TbSquareRoundedPlusFilled className="text-3xl text-tcolor" />
                </InputFile>
              </Button>{" "}
              <Button
                className="aspect-square min-h-fit w-8 p-0"
                disabled={(!message.text.trim() && !file) || loading}
              >
                <FiSend className="text-lg" />
              </Button>
            </div>
          </form>
          <AnimatePresence>
            {file && (
              <Preview file={file} setFile={setFile} loading={loading} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Form;
