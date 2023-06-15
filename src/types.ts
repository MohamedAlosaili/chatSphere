interface TDocument {
  _id: string;
  updateAt: string;
  createdAt: string;
}

export interface TUser extends TDocument {
  username: string;
  email?: string;
  isOnline: boolean;
  photo: string;
}

export interface TRoom extends TDocument {
  private: boolean;
  name: string;
  photo: string;
  roomOwner: string | Omit<TUser, "email">;
  lastMessage: string | TMessage;
  moderators: string[];
}

export interface TMessage extends TDocument {
  type: "announcement" | "text" | "file";
  senderId?: string | Omit<TUser, "email">;
  content?: string;
  file?: {
    type: string;
    url: string;
  };
  roomId: string;
}
