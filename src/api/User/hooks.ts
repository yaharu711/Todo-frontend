import { useMutation, useQuery } from "@tanstack/react-query";
import UserApi from "./functions";
import { LoginRequest, RegistRequest } from "./type";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { registErrorHandler } from "./errorHandlers";

export const useRegist = (setInputError: React.Dispatch<React.SetStateAction<{
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}>>) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: RegistRequest) => UserApi.regist(params),
    onError: (error) => {
        registErrorHandler(setInputError, error)
    },
    onSuccess: () => {
        navigate("/login")
    }
  })
}

export const useLogin = (
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const navigate = useNavigate();

  return useMutation({
    // 本当はselector使ってレスポンスの型はアプリケーションに揃えたいね
    mutationFn: async (credential: LoginRequest) =>
      await UserApi.login(credential),
    onSuccess: () => {
      navigate("/todos");
    },
    onError: (error: AxiosError) => {
      if (error.status === 401)
        setError(
          "メールアドレスかパスワードが間違っています。再度入力してください。"
        );
    },
  });
};

export const useCheckLogined = () => {
  return useQuery({
    queryKey: ["users", "check-login"],
    queryFn: UserApi.checkLogined,
  });
};
