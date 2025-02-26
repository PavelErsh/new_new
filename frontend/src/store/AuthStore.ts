import { makeAutoObservable } from "mobx";
import { IUser } from "../models/responce/User";
import AuthService from "../services/AuthService";
import { AuthResponce } from "../models/responce/AuthResponce";
import { API_URL } from "../setup/axios";
import axios from "axios";

export default class AuthStore {
  user = {} as IUser;
  isAuth: boolean = false;
  isLoading: boolean = false;
  role: string | null = null;
  errorMessage: string | null = null;
  page: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setRole(info: string | null) {
    this.role = info;
  }

  setError(message: string | null) {
    this.errorMessage = message;
  }

  private handleError(e: unknown) {
    let message = "An unexpected error occurred.";
    console.log("Error object:", e);
    if (typeof e === "object" && e !== null && "response" in e) {
      const errorResponse = (e as { response?: { data?: { detail?: string } } })
        .response;
      if (errorResponse && errorResponse.data) {
        message = errorResponse.data.detail || "An unknown error occurred.";
      }
    } else if (e instanceof Error) {
      if (e.message.includes("Network Error")) {
        message = "Ошибка подключения к серверу";
      } else {
        message = e.message;
      }
    }
    this.setError(message);
    console.log(message);
  }

  async login(username: string, password: string) {
    try {
      const responce = await AuthService.login(username, password);
      console.log(responce);
      localStorage.setItem("token", responce.data.access_token);
      this.setAuth(true);
      this.setUser(responce.data.user);
      this.setRole(responce.data.user.role);
      this.setError(null);
    } catch (e) {
      this.handleError(e);
    }
  }

  async registration(username: string, password: string, role: string) {
    try {
      const responce = await AuthService.register(username, password, role);
      localStorage.setItem("token", responce.data.access_token);
      this.setAuth(true);
      this.setUser(responce.data.user);
      this.setRole(role);
      this.setError(null);
    } catch (e) {
      this.handleError(e);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
      this.setRole(null);
      this.setError(null);
    } catch (e) {
      this.handleError(e);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const responce = await axios.get<AuthResponce>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(responce);
      localStorage.setItem("token", responce.data.access_token);
      this.setAuth(true);
      this.setUser(responce.data.user);
      this.setRole(responce.data.user.role);
    } catch (e) {
      this.handleError(e);
    } finally {
      this.setLoading(false);
    }
  }
}
