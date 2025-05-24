import axios, { AxiosResponse } from "axios";
import {
  CheckLineBotFriendResponse,
  CheckLoginedResponse,
  CreateLineAuthUrlResponse,
  LoginRequest,
  RegistRequest,
} from "./type";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const regist = async (request: RegistRequest): Promise<AxiosResponse> => {
  const res = await axios.post(ENDPOINT + "/regist", request, {
    withCredentials: true,
  });
  return res;
};

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

const createLineAuthUrl = async (): Promise<CreateLineAuthUrlResponse> => {
  const res = await axios.get(ENDPOINT + "/line-auth/url", {
    withCredentials: true,
  });
  return res.data;
};

const checkLineBotFriend = async (): Promise<CheckLineBotFriendResponse> => {
  const res = await axios.get(ENDPOINT + "/api/line/check-friend", {
    withCredentials: true,
  });

  return res.data;
};

const UserApi = {
  regist,
  login,
  checkLogined,
  createLineAuthUrl,
  checkLineBotFriend,
};

export default UserApi;
