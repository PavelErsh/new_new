import { makeAutoObservable, runInAction } from "mobx";
import { Log } from "../models/responce/Log";
import LogService from "../services/LogService";

class LogsStore {
  data: Log[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchLogs() {
    try {
      const response = await LogService.getLogs();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения последних действий:", error);
    }
  }
}

const logsStore = new LogsStore();
export default logsStore;
