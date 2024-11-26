import { useMutation } from "@tanstack/react-query";
import UserApi from "./functions";
import { LoginRequest } from "./type";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    // 本当はselector使ってレスポンスの型はアプリケーションに揃えたいね
    mutationFn: (credential: LoginRequest) => UserApi.login(credential),
    onSuccess: () => navigate("/todo"),
  });
};
