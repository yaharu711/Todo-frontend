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

// const OutletWithAuthenticated = () => {
//   // これをやっちゃうと、ずっとafterLoginedがtrueになる。。リロードしても値が保持されたままになる。
//   // でも、今まではuseQueryだったから暗黙的にエラーになっていたのが、今useSuspenseQueryによってあらわになっただけで
//   // 今の構成は変える必要があることは確実なんだよね。。
//   // TODO: とりあえず、ErrorBoundaryとSuspenseの挙動を確認していく。元通りにログインと、セッション切れた時の対応をする

//   return <Outlet />;
// };

export default PrivateLayout;
