import { IProjectStatus } from "../models/responce/ProjectStatus";
import $api from "../setup/axios";

export default class ProjectStatusService {
  static getProjectStatuses() {
    return $api.get<IProjectStatus[]>("/project-statuses");
  }

  static getProjectStatus(id: number) {
    return $api.get<IProjectStatus>(`/project-statuses/${id}`);
  }

  static addProjectStatus(name: string) {
    return $api.post<IProjectStatus>("/project-statuses", { name });
  }

  static updateProjectStatus(updatedRecord: IProjectStatus) {
    return $api.patch<IProjectStatus>(
      `/project-statuses/${updatedRecord.id}`,
      updatedRecord
    );
  }

  static deleteProjectStatus(id: number) {
    return $api.delete<IProjectStatus>(`/project-statuses/${id}`);
  }
}
