import { Outlet } from "react-router-dom";
import { useGetHelloMessage } from "../api/Todo/hooks";

const PrivateLayout = () => {
  const { data } = useGetHelloMessage();
  // このような処理は上位コンポーネントでSuspenseを使えばOK
  //   if (status === "error" || status === "pending") {
  //     return <span>Loading...</span>;
  //   }
  // 以下の用にしていないと、useGetHelloMessage()の処理が終わる前にreturn <Outlet />に来てしまうので
  // 認証されていないときも最初に画面が表示されてしまうので注意
  return data && <Outlet />;
};

//これをPrivateLayoutでSuspenseで囲えばロード中の挙動をSuspenseで制御できる
// const Content = () => {
//   const { data } = useGetHelloMessage();

//   return data ? <Outlet /> : null;
// };

export default PrivateLayout;
