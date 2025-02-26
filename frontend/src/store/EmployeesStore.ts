import { makeAutoObservable, runInAction } from "mobx";
import EmployeeService from "../services/EmployeeService";
import { IEmployee, IEmployeeNotifaction } from "../models/responce/User";
import dayjs from "dayjs";

class EmployeesStore {
  data: IEmployee[] = [];

  editingKey = "";
  currentRecord: IEmployee | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchEmployees() {
    try {
      const response = await EmployeeService.getEmployees();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения сотрудников:", error);
    }
  }

  async addEmployee(username: string, password: string, role: string) {
    const response = await EmployeeService.addEmployee(
      username,
      password,
      role
    );
    this.data.push(response.data);
  }

  async updateEmployee(updatedRecord: IEmployee | IEmployeeNotifaction) {
    try {
      if ('birthday' in updatedRecord && updatedRecord.birthday) {
        updatedRecord.birthday = dayjs(updatedRecord.birthday).format(
          "YYYY-MM-DD"
        );
      }
      const response = await EmployeeService.updateEmployee(updatedRecord);
      this.data = this.data.map((item) =>
        item.id === response.data.id ? { ...item, ...response.data } : item
      );
    } catch (error) {
      console.error("Ошибка изменения сотрудника:", error);
    }
  }

  async removeEmployee(id: number) {
    try {
      await EmployeeService.deleteEmployee(id);
      this.data = this.data.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Ошибка удаления сотрудника:", error);
    }
  }

  setEditingKey(key: string) {
    this.editingKey = key;
  }

  setCurrentRecord(record: IEmployee) {
    this.currentRecord = record;
  }

  updateRecord(updatedRecord: IEmployee) {
    this.data = this.data.map((item) =>
      item.key === updatedRecord.key ? { ...item, ...updatedRecord } : item
    );
  }
}

const employeesStore = new EmployeesStore();
export default employeesStore;
