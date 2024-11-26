import axios, { AxiosResponse } from "axios";
import { apiErrorHandlesType } from "../common/ErrorHanleHook";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const getHelloMessage = async (
  errorHandle?: apiErrorHandlesType
): Promise<string | undefined> => {
  // TODO: interceptorを使って共通化するか。
  try {
    const res = await axios.get(ENDPOINT + "/api/hello-message", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    switch ((error as AxiosResponse).status) {
      case 401:
        errorHandle?.onUnAuthorized?.();
        break;
      default:
        errorHandle?.onDefault?.();
        break;
    }
  }
};

const TodoApi = {
  getHelloMessage,
};

export default TodoApi;
