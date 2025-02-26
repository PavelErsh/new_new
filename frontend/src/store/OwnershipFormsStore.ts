import { makeAutoObservable, runInAction } from "mobx";
import { IOwnershipForm } from "../models/responce/OwnershipForm";
import OwnershipFormService from "../services/OwnershipFormService";

class OwnershipFormsStore {
  data: IOwnershipForm[] = [];

  editingKey = "";
  currentRecord: IOwnershipForm | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchOwnershipForms() {
    try {
      const response = await OwnershipFormService.getOwnershipForms();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения форм собственности:", error);
    }
  }

  async addOwnershipForm(name: string) {
    const response = await OwnershipFormService.addOwnershipForms(name);
    this.data.push(response.data);
  }

  async updateOwnershipForm(updatedRecord: IOwnershipForm) {
    try {
      const response = await OwnershipFormService.updateOwnershipForm(updatedRecord);
      this.data = this.data.map((item) =>
        item.id === response.data.id ? { ...item, ...response.data } : item
      );
    } catch (error) {
      console.error("Ошибка обновления формы собственности:", error);
    }
  }

  async removeOwnershipForm(id: number) {
    try {
      await OwnershipFormService.deleteOwnershipForm(id);
      this.data = this.data.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Ошибка удаления формы собственности:", error);
    }
  }

  setEditingKey(key: string) {
    this.editingKey = key;
  }

  setCurrentRecord(record: IOwnershipForm) {
    this.currentRecord = record;
  }

  updateRecord(updatedRecord: IOwnershipForm) {
    this.data = this.data.map((item) =>
      item.key === updatedRecord.key ? { ...item, ...updatedRecord } : item
    );
  }
}

const ownershipFormsStore = new OwnershipFormsStore();
export default ownershipFormsStore;
