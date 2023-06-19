import { TMessage } from "@/types";

const Announcement = ({ message }: { message: TMessage }) => {
  return (
    <div className="mx-auto mb-2 w-fit bg-bcolor-2 text-sm">
      <p className="rounded-lg bg-accent/10 px-3 py-1 text-tcolor">
        {message.content}
      </p>
    </div>
  );
};

export default Announcement;
