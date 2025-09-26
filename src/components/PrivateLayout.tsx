import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { APIErrorHandler } from "../api/ErrorBoundary";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useRef } from "react";
import { saveAuthFrom } from "../auth/redirectFrom";

const PrivateLayout = () => {
  // 以下のようにOutletと認証状態かどうか確認するカスタムフックの呼び出しをラップして
  // それをSuspenseで囲うことでローディング中の処理をシンプルに記述できるようになっている。
  const { status } = useAuth();
  const location = useLocation();

  // 未認証化に遷移した瞬間にfromをsessionStorageへ保存（ハッシュ含む）
  const savedRef = useRef(false);
  useEffect(() => {
    if (status === "unauthenticated" && !savedRef.current) {
      // saveAuthFrom({
      //   pathname: location.pathname,
      //   search: location.search,
      //   hash: location.hash,
      // });
      savedRef.current = true;
    } else if (status === "authenticated") {
      savedRef.current = false;
    }
  }, [status, location.pathname, location.search, location.hash]);

  if (status === "checking") return <></>;
  if (status === "unauthenticated")
    return (
      <Navigate
        to={{ pathname: "/login" }}
        replace
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        }}
      />
    );

  return (
    <ErrorBoundary FallbackComponent={APIErrorHandler}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default PrivateLayout;
