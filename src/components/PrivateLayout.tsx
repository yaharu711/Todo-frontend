import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { APIErrorHandler } from "../api/ErrorBoundary";

const PrivateLayout = () => {
  // 以下のようにOutletと認証状態かどうか確認するカスタムフックの呼び出しをラップして
  // それをSuspenseで囲うことでローディング中の処理をシンプルに記述できるようになっている。
  return (
    <ErrorBoundary FallbackComponent={APIErrorHandler}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default PrivateLayout;
