import { makeAutoObservable, runInAction } from "mobx";
import { IContact, IResponceContact } from "../models/responce/Contact";
import ContactsService from "../services/ContactService";

class ContactsStore {
  data: IResponceContact[] = [];

  editingKey = "";
  currentRecord: IResponceContact | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchContacts() {
    try {
      const response = await ContactsService.getContacts();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения контактов:", error);
    }
  }

  async addContact(
    firstName: string,
    lastName: string,
    fatherName: string,
    phone: string,
    email: string,
    position: string,
    customer: number
  ) {
    await ContactsService.addContact(
      firstName,
      lastName,
      fatherName,
      phone,
      email,
      position,
      customer
    );
  }

  async updateContact(updatedRecord: IContact) {
    try {
      const response = await ContactsService.updateContact(updatedRecord);
      this.data = this.data.map((item) =>
        item.id === response.data.id ? { ...item, ...response.data } : item
      );
    } catch (error) {
      console.error("Ошибка обновления контакта:", error);
    }
  }

  async removeContact(id: number) {
    try {
      await ContactsService.deleteContact(id);
      this.data = this.data.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Ошибка удаления контакта:", error);
    }
  }

  setEditingKey(key: string) {
    this.editingKey = key;
  }

  setCurrentRecord(record: IResponceContact) {
    this.currentRecord = record;
  }

  updateRecord(updatedRecord: IResponceContact) {
    this.data = this.data.map((item) =>
      item.key === updatedRecord.key ? { ...item, ...updatedRecord } : item
    );
  }
}

const contactsStore = new ContactsStore();
export default contactsStore;
