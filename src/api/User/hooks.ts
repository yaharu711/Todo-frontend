import { useMutation, useQuery } from "@tanstack/react-query";
import UserApi from "./functions";
import { LoginRequest, RegistRequest } from "./type";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { registErrorHandler } from "./errorHandlers";
import { showSuccessToast } from "../../util/CustomToast";
import { useAuth } from "../../auth/AuthProvider";
import { useAuthRedirect } from "../../auth/redirectFrom";
import { ROUTE_PATHS } from "../../routes/paths";

export const useRegist = (
  setInputError: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    }>
  >
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: RegistRequest) => UserApi.regist(params),
    onError: (error) => {
      registErrorHandler(setInputError, error);
    },
    onSuccess: () => {
      navigate(ROUTE_PATHS.login);
    },
  });
};

export const useLogin = (
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const navigate = useNavigate();
  const { markAuthenticated } = useAuth();
  const { target } = useAuthRedirect({ defaultPath: ROUTE_PATHS.todos });

  return useMutation({
    // 本当はselector使ってレスポンスの型はアプリケーションに揃えたいね
    mutationFn: async (credential: LoginRequest) =>
      await UserApi.login(credential),
    onSuccess: () => {
      markAuthenticated();
      navigate(target, { replace: true });
    },
    onError: (error: AxiosError) => {
      if (error.status === 401)
        setError(
          "メールアドレスかパスワードが間違っています。再度入力してください。"
        );
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { markUnauthenticated } = useAuth();

  return useMutation({
    mutationFn: () => UserApi.logout(),
    onSuccess: () => {
      showSuccessToast("ログアウトしました✅");
      markUnauthenticated();
      navigate(ROUTE_PATHS.login);
    },
    onError: () => {
      showSuccessToast("ログアウトに失敗しました❌");
    },
  });
};

export const useCheckLogined = () => {
  return useQuery({
    // 認証状態の単一情報源に合わせてキーを統一
    queryKey: ["auth", "check-login"],
    queryFn: UserApi.checkLogined,
  });
};
