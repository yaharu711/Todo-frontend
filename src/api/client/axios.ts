import axios from "axios";
import { toast } from "react-toastify";
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
      // トーストをここで出すと一元化できる
      toast.error("セッションが切れました。再度ログインしてください");
      // シングルトンQueryClientで認証状態を即時反映
      queryClient.setQueryData(["auth", "check-login"], { is_logined: false });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
