import { useMutation } from "@tanstack/react-query";
import UserApi from "./functions";
import { LoginRequest } from "./type";

export const useLogin = () => {
  return useMutation({
    // 本当はselector使ってレスポンスの型はアプリケーションに揃えたいね
    mutationFn: (credential: LoginRequest) => UserApi.login(credential),
  });
};
