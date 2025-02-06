import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Api422ErrorResponse } from "./type";

const NAME_MAX_LENGTH_OVER = 'The name field must not be greater than 30 characters.';
const NAME_MIN_LENGTH_UNDER = 'The name field is required.';
const EMAIL_DUPLICATED = 'duplicated email';
const PASSWORD_NOT_MATCH = 'The password field confirmation does not match.';

export const registErrorHandler = (
  setInputError: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }>>,
  error: Error,
) => {
  const axiosError = error as AxiosError<Api422ErrorResponse>;
  if (axiosError.status === 422) {
    toast.error("登録に失敗しました", {
      progressStyle: {
        background:
          "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
      },
    });
    // なぜか一番上でバリデーションしないと、その後の処理が中断されている
    // このエラーレスポンスだけバックエンドのRegistControllerで自作しているのが、何か関係ありそう？どこかでreturnしているわけでもないのに、処理が中断ってどういうこと？
    if (axiosError.response?.data?.errors?.email[0] === EMAIL_DUPLICATED) {
        setInputError(prev => ({...prev, email: 'すでに登録されているメールアドレスです'}));
    }
    if (axiosError.response?.data?.errors?.name[0] === NAME_MAX_LENGTH_OVER) {
        setInputError(prev => ({...prev, name: '名前は30文字以下で入力してください'}));
    }
    if (axiosError.response?.data?.errors?.name[0] === NAME_MIN_LENGTH_UNDER) {
        setInputError(prev => ({...prev, name: '名前は1文字以上で入力してください'}));
    }
    if (axiosError.response?.data?.errors?.password[0] === PASSWORD_NOT_MATCH) {
        setInputError(prev => ({...prev, password: 'パスワードが一致していません'}))
    };
  }
}
