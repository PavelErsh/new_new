import $api from "../setup/axios";

export default class BackupService {
  static getLogs() {
    return $api.get("/export", {
      responseType: "blob",
    });
  }
}
