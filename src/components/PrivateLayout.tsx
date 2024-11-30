import { Outlet } from "react-router-dom";
import { useGetHelloMessage } from "../api/Todo/hooks";
import { Suspense } from "react";
import FadeLoaderOverlapedAll from "./FadeLoaderOverlapedAll";

const PrivateLayout = () => {
  // このような処理は上位コンポーネントでSuspenseを使えばOK
  //   if (status === "error" || status === "pending") {
  //     return <span>Loading...</span>;
  //   }
  // 以下の用にしていないと、useGetHelloMessage()の処理が終わる前にreturn <Outlet />に来てしまうので
  // 認証されていないときも最初に画面が表示されてしまうので注意
  return (
    <Suspense fallback={<FadeLoaderOverlapedAll />}>
      <OutletWithAuthenticated />
    </Suspense>
  );
};

const OutletWithAuthenticated = () => {
  const { data } = useGetHelloMessage();

  return data ? <Outlet /> : null;
};

export default PrivateLayout;
