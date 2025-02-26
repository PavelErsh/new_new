import { makeAutoObservable, runInAction } from "mobx";
import { IProjectStatus } from "../models/responce/ProjectStatus";
import ProjectStatusService from "../services/ProjectStatusService";

class ProjectStatusesStore {
  data: IProjectStatus[] = [];

  editingKey = "";
  currentRecord: IProjectStatus | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProjectStatuses() {
    try {
      const response = await ProjectStatusService.getProjectStatuses();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения статуса проекта:", error);
    }
  }

  async addProjectStatus(name: string) {
    const response = await ProjectStatusService.addProjectStatus(name);
    this.data.push(response.data);
  }

  async updateProjectStatus(updatedRecord: IProjectStatus) {
    try {
      const response = await ProjectStatusService.updateProjectStatus(
        updatedRecord
      );
      this.data = this.data.map((item) =>
        item.id === response.data.id ? { ...item, ...response.data } : item
      );
    } catch (error) {
      console.error("Ошибка обновления статуса проекта:", error);
    }
  }

  async removeProjectStatus(id: number) {
    try {
      await ProjectStatusService.deleteProjectStatus(id);
      this.data = this.data.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Ошибка удаления формы собственности:", error);
    }
  }

  setEditingKey(key: string) {
    this.editingKey = key;
  }

  setCurrentRecord(record: IProjectStatus) {
    this.currentRecord = record;
  }

  updateRecord(updatedRecord: IProjectStatus) {
    this.data = this.data.map((item) =>
      item.key === updatedRecord.key ? { ...item, ...updatedRecord } : item
    );
  }
}

const projectStatusesStore = new ProjectStatusesStore();
export default projectStatusesStore;
