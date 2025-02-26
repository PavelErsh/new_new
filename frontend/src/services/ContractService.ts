import { IContract, IContractResponce } from "../models/responce/Contract";
import $api from "../setup/axios";

export default class ContractService {
  static getContracts() {
    return $api.get<IContractResponce[]>("/contracts");
  }

  static getContract(id: number) {
    return $api.get<IContractResponce>(`/contracts/${id}`);
  }

  static addContract(
    code: number,
    name: string,
    customer: number,
    executor: number,
    number: string,
    price: number,
    theme: string,
    sign_date: string | null | undefined
  ) {
    const data: IContract = {
      code,
      name,
      customer,
      executor,
      number,
      price,
      theme,
    };

    if (sign_date) {
      data.sign_date = sign_date;
    }
    return $api.post<IContract>("/contracts", data);
  }

  static updateContract(updatedRecord: IContract) {
    return $api.patch<IContractResponce>(
      `/contracts/${updatedRecord.id}`,
      updatedRecord
    );
  }

  static deleteContract(id: number) {
    return $api.delete<IContract>(`/contracts/${id}`);
  }
}
