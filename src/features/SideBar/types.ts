import { TUser } from "@/types";

export type Tap = "profile" | "users" | "my rooms" | "public rooms";

export interface ToggleModalOptions {
  redirect?: boolean;
  show?: boolean;
  selectedUser?: TUser;
}
