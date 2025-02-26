import { IAgreement, IAgreementResponce } from "../models/responce/Agreement";
import $api from "../setup/axios";

export default class AgreementsService {
  static getAgreements() {
    return $api.get<IAgreementResponce[]>("/agreements");
  }

  static getAgreement(id: number) {
    return $api.get<IAgreementResponce>(`/agreements/${id}`);
  }

  static addAgreement(
    name: string,
    number: string,
    price: number,
    deadline: string,
    notes: string | null,
    contract: number
  ) {
    const data: IAgreement = {
      name,
      number,
      price,
      deadline,
      notes,
      contract,
    };

    return $api.post<IAgreement>("/agreements", data);
  }

  static updateAgreement(updatedRecord: IAgreement) {
    return $api.patch<IAgreementResponce>(
      `/agreements/${updatedRecord.id}`,
      updatedRecord
    );
  }

  static deleteAgreement(id: number) {
    return $api.delete<IAgreement>(`/agreements/${id}`);
  }
}
