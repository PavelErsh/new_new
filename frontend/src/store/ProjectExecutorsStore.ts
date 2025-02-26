import { makeAutoObservable, runInAction } from "mobx";
import {
  IProjectExecutor,
  IProjectExecutorResponce,
} from "../models/responce/ProjectExecutor";
import ProjectExecutorService from "../services/ProjectExecutorService";

class ProjectExecutorsStore {
  data: IProjectExecutorResponce[] = [];

  editingKey = "";
  currentRecord: IProjectExecutorResponce | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProjectExecutors() {
    try {
      const response = await ProjectExecutorService.getProjectExecutors();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения ответственных на проекте:", error);
    }
  }

  async addProjectExecutor(user: number, project: number) {
    await ProjectExecutorService.addProjectExecutor(user, project);
  }

  async updateProjectExecutor(updatedRecord: IProjectExecutor) {
    const response = await ProjectExecutorService.updateProjectExecutor(
      updatedRecord
    );
    this.data = this.data.map((item) =>
      item.id === response.data.id ? { ...item, ...response.data } : item
    );
  }

  async removeProjectExecutor(id: number) {
    try {
      await ProjectExecutorService.deleteProjectExecutor(id);
      this.data = this.data.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Ошибка удаления ответственного на проекте:", error);
    }
  }

  setEditingKey(key: string) {
    this.editingKey = key;
  }

  setCurrentRecord(record: IProjectExecutorResponce) {
    this.currentRecord = record;
  }

  updateRecord(updatedRecord: IProjectExecutorResponce) {
    this.data = this.data.map((item) =>
      item.key === updatedRecord.key ? { ...item, ...updatedRecord } : item
    );
  }
}

const projectExecutorsStore = new ProjectExecutorsStore();
export default projectExecutorsStore;
