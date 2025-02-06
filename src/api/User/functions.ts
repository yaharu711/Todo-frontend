import axios, { AxiosResponse } from "axios";
import { CheckLoginedResponse, LoginRequest, RegistRequest } from "./type";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const regist = async (request: RegistRequest): Promise<AxiosResponse> => {
  const res = await axios.post(ENDPOINT + "/regist", request, {
    withCredentials: true,
  })
  return res;
}

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
  regist,
  login,
  checkLogined,
};

export default UserApi;
