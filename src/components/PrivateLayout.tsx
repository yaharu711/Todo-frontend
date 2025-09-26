import { Navigate, Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { APIErrorHandler } from "../api/ErrorBoundary";
import { useAuth } from "../auth/AuthProvider";
import { useAuthRedirect } from "../auth/redirectFrom";
import { ROUTE_PATHS } from "../routes/paths";

const PrivateLayout = () => {
  // 以下のようにOutletと認証状態かどうか確認するカスタムフックの呼び出しをラップして
  // それをSuspenseで囲うことでローディング中の処理をシンプルに記述できるようになっている。
  const { status } = useAuth();
  const { buildNavigateState } = useAuthRedirect({ defaultPath: ROUTE_PATHS.todos });

  // セッションストレージ保存は廃止。Navigate の state で十分。

  if (status === "checking") return <></>;
  if (status === "unauthenticated")
    return (
      <Navigate
        to={{ pathname: ROUTE_PATHS.login }}
        replace
        state={buildNavigateState()}
      />
    );

  return (
    <ErrorBoundary FallbackComponent={APIErrorHandler}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default PrivateLayout;
