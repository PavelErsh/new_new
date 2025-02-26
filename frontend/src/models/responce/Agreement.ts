import { IContract } from "./Contract";

export interface IAgreement {
    key?: string | null;
    id?: number;
    name: string;
    number: string;
    price: number;
    deadline: string;
    notes: string | null;
    contract: number;
}

export interface IAgreementResponce {
    key?: string | null;
    id?: number;
    name: string;
    number: string;
    price: number;
    deadline: string;
    notes: string | null;
    contract: IContract;
}