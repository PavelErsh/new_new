import { ICustomer } from "./Customer";

export interface IContact {
    key?: string | null;
    id: number;
    first_name: string;
    last_name: string;
    father_name: string;
    phone: string;
    email: string;
    position: string;
    customer: number;
}

export interface IResponceContact {
    key?: string | null;
    id: number;
    first_name: string;
    last_name: string;
    father_name: string;
    phone: string;
    email: string;
    position: string;
    customer: ICustomer;
}