import axios, { AxiosResponse } from "axios";
import { apiErrorHandlesType } from "../../App";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const getHelloMessage = async (
  errorHandle?: apiErrorHandlesType
): Promise<string | undefined> => {
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
