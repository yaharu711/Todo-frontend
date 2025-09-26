import axios from "axios";
import { queryClient } from "../../lib/react-query";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // シングルトンQueryClientで認証状態を即時反映
      queryClient.setQueryData(["auth", "check-login"], { is_logined: false });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
