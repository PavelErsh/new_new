import { ICustomer, ICustomerResponce } from "../models/responce/Customer";
import $api from "../setup/axios";


export default class CustomerService {
  static getCustomers() {
    return $api.get<ICustomerResponce[]>("/customers");
  }

  static getCustomer(id: number) {
    return $api.get<ICustomerResponce>(`/customers/${id}`);
  }

  static addCustomer(name: string, form: number, address: string, inn: string, notes: string | null) {
    return $api.post<ICustomer>("/customers", { name, form, address, inn, notes });
  }

  static updateCustomer(updatedRecord: ICustomer) {
    return $api.patch<ICustomerResponce>(
      `/customers/${updatedRecord.id}`,
      updatedRecord
    );
  }

  static deleteCustomer(id: number) {
    return $api.delete<ICustomer>(`/customers/${id}`);
  }
}
