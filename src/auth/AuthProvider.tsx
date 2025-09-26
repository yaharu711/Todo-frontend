import { createContext, useContext, ReactNode, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UserApi from "../api/User/functions";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  refetch: () => void;
  markAuthenticated: () => void;
  markUnauthenticated: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["auth", "check-login"],
    queryFn: UserApi.checkLogined,
    staleTime: 60 * 1000, // 認証状態は頻繁に変わらない前提で1分キャッシュ
  });

  const status: AuthStatus = isPending
    ? "checking"
    : data?.is_logined
    ? "authenticated"
    : "unauthenticated";

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      refetch: () => {
        void refetch();
      },
      markAuthenticated: () => {
        queryClient.setQueryData(["auth", "check-login"], { is_logined: true });
      },
      markUnauthenticated: () => {
        queryClient.setQueryData(["auth", "check-login"], {
          is_logined: false,
        });
      },
    }),
    [status, refetch, queryClient]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
