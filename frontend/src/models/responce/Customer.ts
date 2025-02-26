import { IContact } from "./Contact";
import { IOwnershipForm } from "./OwnershipForm";

export interface ICustomer {
  key?: string | null;
  id: number;
  form: number;
  name: string;
  address: string;
  inn: string;
  comment: string | null;
}

export interface ICustomerResponce {
  key?: string | null;
  id: number;
  form: IOwnershipForm;
  name: string;
  address: string;
  inn: string;
  comment: string | null;
  contacts: IContact[] | [];
}
