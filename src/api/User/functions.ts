import { AxiosResponse } from "axios";
import apiClient from "../client/axios";
import {
  CheckLoginedResponse,
  CreateLineAuthUrlResponse,
  LoginRequest,
  RegistRequest,
} from "./type";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const regist = async (request: RegistRequest): Promise<AxiosResponse> => {
  const res = await apiClient.post("/regist", request);
  return res;
};

const login = async (request: LoginRequest): Promise<AxiosResponse> => {
  const res = await apiClient.post("/login", request);
  return res;
};

const logout = async (): Promise<AxiosResponse> => {
  const res = await apiClient.post("/logout");
  return res;
};

const checkLogined = async (): Promise<CheckLoginedResponse> => {
  const res = await apiClient.post("/check-login");
  return res.data;
};

const createLineAuthUrl = async (): Promise<CreateLineAuthUrlResponse> => {
  const res = await apiClient.get("/line-auth/url");
  return res.data;
};

const UserApi = {
  regist,
  login,
  logout,
  checkLogined,
  createLineAuthUrl,
};

export default UserApi;
