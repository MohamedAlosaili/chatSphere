import { TMessage } from "@/types";

export interface EditMessageProps {
  close: () => void;
  message: TMessage;
  closeEditMessage: () => void;
}
