import { IProject, IProjectResponce } from "../models/responce/Project";
import $api from "../setup/axios";

export default class ProjectService {
  static getProjects() {
    return $api.get<IProjectResponce[]>("/projects");
  }

  static getContract(id: number) {
    return $api.get<IProjectResponce>(`/projects/${id}`);
  }

  static addProject(
    object: number,
    contract: number | null,
    name: string,
    number: string,
    main_executor: number,
    deadline: string,
    status: string,
    notes: string | null
  ) {
    const data: IProject = {
      object,
      contract,
      name,
      number,
      main_executor,
      deadline,
      status,
      notes,
    };

    return $api.post<IProject>("/projects", data);
  }

  static updateProject(updatedRecord: IProject) {
    return $api.patch<IProjectResponce>(
      `/projects/${updatedRecord.id}`,
      updatedRecord
    );
  }

  static deleteProject(id: number) {
    return $api.delete<IProject>(`/projects/${id}`);
  }
}
