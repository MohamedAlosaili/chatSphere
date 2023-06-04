export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  isOnline: boolean;
  createdAt: Date | string;
}
