import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

export const commonFCMApiErrorHandler = (
  error: Error,
  _navigate?: NavigateFunction
) => {
  const axiosError = error as AxiosError;
  if (axiosError.status === 401) {
    // 401は呼び出し元で未認証化＋遷移（PrivateLayout）に委任
    return;
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
