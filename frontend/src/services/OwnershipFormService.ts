import $api from "../setup/axios";
import { IOwnershipForm } from "../models/responce/OwnershipForm";

export default class OwnershipFormService {
  static getOwnershipForms() {
    return $api.get<IOwnershipForm[]>("/form-of-ownership");
  }

  static getOwnershipForm(id: number) {
    return $api.get<IOwnershipForm>(`/form-of-ownership/${id}`);
  }

  static addOwnershipForms(name: string) {
    return $api.post<IOwnershipForm>("/form-of-ownership", { name });
  }

  static updateOwnershipForm(updatedRecord: IOwnershipForm) {
    return $api.patch<IOwnershipForm>(
      `/form-of-ownership/${updatedRecord.id}`,
      updatedRecord
    );
  }

  static deleteOwnershipForm(id: number) {
    return $api.delete<IOwnershipForm>(`/form-of-ownership/${id}`);
  }
}
