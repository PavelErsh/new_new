import {
  IProjectExecutor,
  IProjectExecutorResponce,
} from "../models/responce/ProjectExecutor";
import $api from "../setup/axios";

export default class ProjectExecutorService {
  static getProjectExecutors() {
    return $api.get<IProjectExecutorResponce[]>("/project-executors");
  }

  static getProjectExecutor(id: number) {
    return $api.get<IProjectExecutorResponce>(`/project-executors/${id}`);
  }

  static addProjectExecutor(user: number, project: number) {
    const data: IProjectExecutor = {
      user,
      project,
    };

    return $api.post<IProjectExecutor>("/project-executors", data);
  }

  static updateProjectExecutor(updatedRecord: IProjectExecutor) {
    return $api.patch<IProjectExecutorResponce>(
      `/project-executors/${updatedRecord.id}`,
      updatedRecord
    );
  }

  static deleteProjectExecutor(id: number) {
    return $api.delete<IProjectExecutor>(`/project-executors/${id}`);
  }
}
