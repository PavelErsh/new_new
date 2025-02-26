import { IProject } from "./Project";
import { IEmployee } from "./User";

export interface IProjectExecutor {
  key?: string;
  id?: number;
  project: number;
  user: number;
}

export interface IProjectExecutorResponce {
  key?: string | null;
  id?: number;
  project: IProject;
  user: IEmployee;
}
