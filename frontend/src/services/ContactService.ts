import { IContact, IResponceContact } from "../models/responce/Contact";
import $api from "../setup/axios";

export default class ContactsService {
  static getContacts() {
    return $api.get<IResponceContact[]>("/contacts");
  }

  static getContact(id: number) {
    return $api.get<IResponceContact>(`/contacts/${id}`);
  }

  static addContact(
    firstName: string,
    lastName: string,
    fatherName: string,
    phone: string,
    email: string,
    position: string,
    customer: number
  ) {
    return $api.post<IContact>("/contacts", {
      first_name: firstName,
      last_name: lastName,
      father_name: fatherName,
      phone,
      email,
      position,
      customer
    });
  }

  static updateContact(updatedRecord: IContact) {
    return $api.patch<IResponceContact>(`/contacts/${updatedRecord.id}`, updatedRecord);
  }

  static deleteContact(id: number) {
    return $api.delete<IContact>(`/contacts/${id}`);
  }
}
