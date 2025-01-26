import axios, { AxiosResponse } from "axios";
import { CheckLoginedResponse, LoginRequest } from "./type";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const login = async (request: LoginRequest): Promise<AxiosResponse> => {
  const res = await axios.post(ENDPOINT + "/login", request, {
    withCredentials: true,
  });
  return res;
};

const checkLogined = async (): Promise<CheckLoginedResponse> => {
  const res = await axios.post(ENDPOINT + "/check-login", undefined, {
    withCredentials: true,
  });
  return res.data;
};

const UserApi = {
  login,
  checkLogined,
};

export default UserApi;
