import { BiConversation } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { ImMagicWand } from "react-icons/im";
import { MdPermMedia, MdOutlineWifi } from "react-icons/md";
import { BsMagic } from "react-icons/bs";

interface CardProps {
  title: string;
  description: string;
  icon: string;
}

const icons = [
  {
    name: "magic",
    icon: ImMagicWand,
  },
  {
    name: "online",
    icon: MdOutlineWifi,
  },
  {
    name: "chat",
    icon: BiConversation,
  },
  {
    name: "media",
    icon: MdPermMedia,
  },
  {
    name: "manage",
    icon: FiSettings,
  },
];

const defaultIcon = BsMagic;

const Card = ({ title, description, icon }: CardProps) => {
  const Icon = icons.find(ic => ic.name === icon)?.icon ?? defaultIcon;
  return (
    <div className="flex shrink-0 grow basis-80  flex-col items-center gap-4 rounded-xl bg-accent/10 px-4 py-8 text-center ">
      <Icon size={50} className="text-accent" />
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default Card;
