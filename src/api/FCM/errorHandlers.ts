import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

export const commonFCMApiErrorHandler = (
  error: Error,
  navigate: NavigateFunction
) => {
  const axiosError = error as AxiosError;
  console.log(axiosError.status);
  if (axiosError.status === 401) {
    navigate("/login?isFrom401=true", { replace: true });
    // 500エラーの時はstatusがundefinedになる
  } else if (axiosError.status === undefined || axiosError.status === 500) {
    toast.error(
      "通知の設定に失敗しました。500エラー発生のため開発者に問い合わせてください",
      {
        progressStyle: {
          background:
            "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
        },
      }
    );
  } else {
    throw error;
  }
};
