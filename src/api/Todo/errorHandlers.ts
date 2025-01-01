import { AxiosError } from "axios";

// 本当はメッセージよりエラーcodeにした方がよい。
const NAME_MAX_LENGTH_OVER =
  "The name field must not be greater than 100 characters.";

export const createTodoErrorHandler = (
  setInputError: React.Dispatch<React.SetStateAction<string>>,
  error: Error
) => {
  const axiosError = error as AxiosError;
  if (axiosError.status === 422) {
    // @ts-expect-error ts-expect-error
    if (NAME_MAX_LENGTH_OVER === axiosError.response?.data?.message) {
      setInputError("TODO名は100文字までです");
    }
  } else {
    throw error;
  }
};
