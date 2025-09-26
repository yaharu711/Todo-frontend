import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

// 本当はメッセージよりエラーcodeにした方がよい。
const NAME_MAX_LENGTH_OVER =
  "The name field must not be greater than 100 characters.";

export const createTodoErrorHandler = (
  setInputError: React.Dispatch<React.SetStateAction<string>>,
  error: Error,
  navigate: NavigateFunction
) => {
  const axiosError = error as AxiosError;
  if (axiosError.status === 422) {
    toast.error("TODOの更新に失敗しました", {
      progressStyle: {
        background:
          "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
      },
    });
    // @ts-expect-error ts-expect-error
    if (NAME_MAX_LENGTH_OVER === axiosError.response?.data?.message) {
      setInputError("TODO名は100文字までです");
    }
  } else if (axiosError.status === 401) {
    // 401は呼び出し元で未認証化＋遷移（PrivateLayout）に委任
    return;
    // 500エラーの時はstatusがundefinedになる
  } else if (axiosError.status === undefined) {
    toast.error(
      "TODOの更新に失敗しました。500エラー発生のため開発者に問い合わせてください",
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

export const updateTodoDetailErrorHandler = (
  setInputError: React.Dispatch<React.SetStateAction<string>>,
  error: Error,
  navigate: NavigateFunction,
  updateCache: () => void,
  updateCacheToPrevious: () => void
) => {
  const axiosError = error as AxiosError;
  if (axiosError.status === 422) {
    toast.error("TODOの更新に失敗しました", {
      progressStyle: {
        background:
          "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
      },
    });
    // @ts-expect-error ts-expect-error
    if (NAME_MAX_LENGTH_OVER === axiosError.response?.data?.message) {
      setInputError("TODO名は100文字までです");
    }
    updateCache();
  } else if (axiosError.status === 401) {
    // 401は呼び出し元で未認証化＋遷移（PrivateLayout）に委任
    updateCacheToPrevious();
    return;
    // 500エラーの時はstatusがundefinedになる
  } else if (axiosError.status === undefined) {
    toast.error(
      "TODOの更新に失敗しました。500エラー発生のため開発者に問い合わせてください",
      {
        progressStyle: {
          background:
            "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
        },
      }
    );
    updateCacheToPrevious();
  } else {
    updateCacheToPrevious();
    throw error;
  }
};

export const updateTodoErrorHandler = (
  error: Error,
  navigate: NavigateFunction
) => {
  const axiosError = error as AxiosError;
  if (axiosError.status === 401) {
    // 401は呼び出し元で未認証化＋遷移（PrivateLayout）に委任
    return;
    // 500エラーの時はstatusがundefinedになる
  } else if (axiosError.status === undefined) {
    toast.error(
      "TODOの更新に失敗しました。500エラー発生のため開発者に問い合わせてください",
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
