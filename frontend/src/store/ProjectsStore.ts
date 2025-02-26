import { makeAutoObservable, runInAction } from "mobx";
import { IProject, IProjectResponce } from "../models/responce/Project";
import ProjectService from "../services/ProjectService";
import dayjs from "dayjs";

class ProjectsStore {
  data: IProjectResponce[] = [];

  editingKey = "";
  currentRecord: IProjectResponce | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProjects() {
    try {
      const response = await ProjectService.getProjects();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения проектов:", error);
    }
  }

  async addProject(
    object: number,
    contract: number | null,
    name: string,
    number: string,
    main_executor: number,
    deadline: string,
    status: string,
    notes: string | null
  ) {
    const formattedDeadline = dayjs(deadline).format("YYYY-MM-DD");
    await ProjectService.addProject(
      object,
      contract,
      name,
      number,
      main_executor,
      formattedDeadline,
      status,
      notes
    );
  }

  async updateProject(updatedRecord: IProject) {
    try {
      if (updatedRecord.deadline) {
        updatedRecord.deadline = dayjs(updatedRecord.deadline).format(
          "YYYY-MM-DD"
        );
      }
      const response = await ProjectService.updateProject(updatedRecord);
      this.data = this.data.map((item) =>
        item.id === response.data.id ? { ...item, ...response.data } : item
      );
    } catch (error) {
      console.error("Ошибка обновления проекта:", error);
    }
  }

  async removeProject(id: number) {
    try {
      await ProjectService.deleteProject(id);
      this.data = this.data.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Ошибка удаления проекта:", error);
    }
  }

  setEditingKey(key: string) {
    this.editingKey = key;
  }

  setCurrentRecord(record: IProjectResponce) {
    this.currentRecord = record;
  }

  updateRecord(updatedRecord: IProjectResponce) {
    this.data = this.data.map((item) =>
      item.key === updatedRecord.key ? { ...item, ...updatedRecord } : item
    );
  }
}

const projectsStore = new ProjectsStore();
export default projectsStore;
