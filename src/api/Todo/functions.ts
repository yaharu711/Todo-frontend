import axios from "axios";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const getHelloMessage = async (): Promise<string> => {
  const res = await axios.get(ENDPOINT + "/api/hello-message", {
    withCredentials: true,
  });
  return res.data;
  // TODO: interceptorを使って共通化するか。
  // try {
  //   const res = await axios.get(ENDPOINT + "/api/hello-message", {
  //     withCredentials: true,
  //   });
  //   return res.data;
  // } catch (error) {
  //   const axiosError = error as AxiosError;
  //   if (axiosError.status === 401) {
  //     errorHandle?.onUnAuthorized?.();
  //   } else {
  //     errorHandle?.onDefault?.();
  //   }
  //   throw error;
  // }
};

const TodoApi = {
  getHelloMessage,
};

export default TodoApi;
