import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import FadeLoaderOverlapedAll from "./FadeLoaderOverlapedAll";
import { ErrorBoundary } from "react-error-boundary";
import { APIErrorHandler } from "../api/ErrorBoundary";

const PrivateLayout = () => {
  // 以下のようにOutletと認証状態かどうか確認するカスタムフックの呼び出しをラップして
  // それをSuspenseで囲うことでローディング中の処理をシンプルに記述できるようになっている。
  return (
    <ErrorBoundary FallbackComponent={APIErrorHandler}>
      <Suspense fallback={<FadeLoaderOverlapedAll />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PrivateLayout;
