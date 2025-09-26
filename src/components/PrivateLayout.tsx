import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { APIErrorHandler } from "../api/ErrorBoundary";
import { useAuth } from "../auth/AuthProvider";

const PrivateLayout = () => {
  // 以下のようにOutletと認証状態かどうか確認するカスタムフックの呼び出しをラップして
  // それをSuspenseで囲うことでローディング中の処理をシンプルに記述できるようになっている。
  const { status } = useAuth();
  const location = useLocation();

  if (status === "checking") return <></>;
  if (status === "unauthenticated")
    return (
      <Navigate
        to={{ pathname: "/login" }}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );

  return (
    <ErrorBoundary FallbackComponent={APIErrorHandler}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default PrivateLayout;
