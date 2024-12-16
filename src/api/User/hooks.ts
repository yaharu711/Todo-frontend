import { useMutation } from "@tanstack/react-query";
import UserApi from "./functions";
import { LoginRequest } from "./type";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const useLogin = (
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const navigate = useNavigate();

  return useMutation({
    // 本当はselector使ってレスポンスの型はアプリケーションに揃えたいね
    mutationFn: async (credential: LoginRequest) =>
      await UserApi.login(credential),
    onSuccess: () => {
      navigate("/todo");
    },
    onError: (error: AxiosError) => {
      if (error.status === 401)
        setError(
          "メールアドレスかパスワードが間違っています。再度入力してください。"
        );
    },
  });
};
