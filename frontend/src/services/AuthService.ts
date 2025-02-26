import $api from "../setup/axios";
import { AuthResponce } from "../models/responce/AuthResponce";

export default class AuthService {
  static async login(username: string, password: string) {
    return $api.post<AuthResponce>("/login", { username, password });
  }

  static async register(username: string, password: string, role: string) {
    return $api.post<AuthResponce>("/register", { username, password, role });
  }

  static async logout(): Promise<void> {
    $api.post("/logout");
  }
}
