import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useGetHelloMessage } from "../api/Todo/hooks";

const PrivateLayout = () => {
  const navigate = useNavigate();
  // 認証情報の有効、無効の管理はバックエンドでやってもらえば良い！
  // ユーザー情報を取得するAPIを叩いて、401が返ってきたらloginページに遷移するようにする
  // もし、そのAPIを叩くカスタムフックからundefined以外が返ってきたらログイン状態とみなすという感じにしよう
  // 401になる。。こういうエラーレスポンスのハンドリングってどこでどうやってやるんだ？？？
  const { data, error } = useGetHelloMessage();
  console.log(data);
  console.log(error);
  if (data === undefined) {
    return navigate("/login");
  }
  return <Outlet />;
};

export default PrivateLayout;
