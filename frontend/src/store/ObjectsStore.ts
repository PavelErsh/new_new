import { makeAutoObservable, runInAction } from "mobx";
import { IObject } from "../models/responce/Object";
import ObjectService from "../services/ObjectService";

class ObjectsStore {
  data: IObject[] = [];

  editingKey = "";
  currentRecord: IObject | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchObjects() {
    try {
      const response = await ObjectService.getObjects();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения объектов:", error);
    }
  }

  async addObject(code: string, name: string, comment: string | null) {
    const response = await ObjectService.addObject(code, name, comment);
    this.data.push(response.data);
  }

  async updateObject(updatedRecord: IObject) {
    try {
      const response = await ObjectService.updateObject(updatedRecord);
      this.data = this.data.map((item) =>
        item.id === response.data.id ? { ...item, ...response.data } : item
      );
    } catch (error) {
      console.error("Ошибка обновления объекта:", error);
    }
  }

  async removeObject(id: number) {
    try {
      await ObjectService.deleteObject(id);
      this.data = this.data.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Ошибка удаления объекта:", error);
    }
  }

  setEditingKey(key: string) {
    this.editingKey = key;
  }

  setCurrentRecord(record: IObject) {
    this.currentRecord = record;
  }

  updateRecord(updatedRecord: IObject) {
    this.data = this.data.map((item) =>
      item.key === updatedRecord.key ? { ...item, ...updatedRecord } : item
    );
  }
}

const objectsStore = new ObjectsStore();
export default objectsStore;
