import axios from "axios";
import { emitUnauthenticated } from "../../auth/authEvents";
import { toast } from "react-toastify";

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

      emitUnauthenticated();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
