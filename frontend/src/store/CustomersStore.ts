import { makeAutoObservable, runInAction } from "mobx";
import { ICustomer, ICustomerResponce } from "../models/responce/Customer";
import CustomerService from "../services/CustomerService";

class CustomersStore {
  data: ICustomerResponce[] = [];

  editingKey = "";
  currentRecord: ICustomerResponce | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCustomers() {
    try {
      const response = await CustomerService.getCustomers();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения заказчиков:", error);
    }
  }

  async addCustomer(
    name: string,
    form: number,
    address: string,
    inn: string,
    notes: string | null
  ) {
    await CustomerService.addCustomer(
      name,
      form,
      address,
      inn,
      notes
   );
  }

  async updateCustomer(updatedRecord: ICustomer) {
    try {
      const response = await CustomerService.updateCustomer(updatedRecord);
      this.data = this.data.map((item) =>
        item.id === response.data.id ? { ...item, ...response.data } : item
      );
    } catch (error) {
      console.error("Ошибка обновления заказчика:", error);
    }
  }

  async removeCustomer(id: number) {
    try {
      await CustomerService.deleteCustomer(id);
      this.data = this.data.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Ошибка удаления заказчика:", error);
    }
  }

  setEditingKey(key: string) {
    this.editingKey = key;
  }

  setCurrentRecord(record: ICustomerResponce) {
    this.currentRecord = record;
  }

  updateRecord(updatedRecord: ICustomerResponce) {
    this.data = this.data.map((item) =>
      item.key === updatedRecord.key ? { ...item, ...updatedRecord } : item
    );
  }
}

const customersStore = new CustomersStore();
export default customersStore;
