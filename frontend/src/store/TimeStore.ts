import { makeAutoObservable } from "mobx";

export default class TimeStore {
  currentTime = "";
  futureTime = "";

  constructor() {
    makeAutoObservable(this);
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = new Date();
    const future = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    this.currentTime = `Текущее время: ${now.toLocaleTimeString("ru-RU", {
      hour12: false,
    })}`;
    this.futureTime = `Второе время: ${future.toLocaleTimeString("ru-RU", {
      hour12: false,
    })}`;
  }
}
