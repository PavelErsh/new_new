import { IAgreement } from "./Agreement";
import { ICustomer } from "./Customer";
import { IObject } from "./Object";
import { IEmployee } from "./User";

export interface IContract {
  key?: string | null;
  id?: number;
  code: number;
  name: string;
  customer: number;
  executor: number;
  number: string;
  sign_date?: string | null;
  price: number;
  theme: string;
  evolution?: string;
}

export interface IContractResponce {
  key?: string | null;
  id: number;
  code: IObject;
  name: string;
  customer: ICustomer;
  executor: IEmployee;
  number:string;
  sign_date?: string | null;
  price: number;
  theme: string;
  evolution?: string;
  agreements: IAgreement[] | [];
}
