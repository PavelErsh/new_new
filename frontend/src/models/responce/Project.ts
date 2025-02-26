import { IContract } from "./Contract";
import { IObject } from "./Object";
import { IProjectExecutorResponce } from "./ProjectExecutor";
import { IProjectStatus } from "./ProjectStatus";
import { IEmployee } from "./User";

export interface IProject {
  key?: string | null;
  id?: number;
  object: number;
  contract: number | null;
  name: string;
  number: string;
  main_executor: number;
  deadline: string;
  status: string;
  notes: string | null;
}

export interface IProjectResponce {
  key?: string | null;
  id?: number;
  object: IObject;
  contract: IContract | null;
  name: string;
  number: string;
  main_executor: IEmployee;
  deadline: string;
  status: IProjectStatus;
  notes: string | null;
  project_executors: IProjectExecutorResponce[] | [];
}
