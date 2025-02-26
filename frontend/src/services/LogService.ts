import { Log } from "../models/responce/Log";
import $api from "../setup/axios";

export default class LogService {
    static getLogs() {
      return $api.get<Log[]>("/logs");
    }
}
  