import { IEmployee, IEmployeeNotifaction } from "../models/responce/User";
import $api from "../setup/axios";

export default class EmployeeService {
  static getEmployees() {
    return $api.get<IEmployee[]>("/users");
  }

  static getEmployee(id: number) {
    return $api.get<IEmployee>(`/users/${id}`);
  }

  static addEmployee(username: string, password: string, role: string) {
    return $api.post<IEmployee>("/users", {
      username,
      password,
      role,
    });
  }

  static updateEmployee(updatedRecord: IEmployee | IEmployeeNotifaction) {
    return $api.patch<IEmployee | IEmployeeNotifaction>(`/users/${updatedRecord.id}`, updatedRecord);
  }

  static deleteEmployee(id: number) {
    return $api.delete<IEmployee>(`/users/${id}`);
  }
}
