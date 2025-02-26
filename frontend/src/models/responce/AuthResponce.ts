import { IUser } from "./User";

export interface AuthResponce {
  access_token: string;
  refresh_token: string;
  user: IUser;
}
