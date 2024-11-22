import { useLogin } from "../api/User/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div>
      <h1>ログインページ</h1>
      {message && <div>{message}</div>}
      <button
        onClick={() =>
          loginMutation.mutate(
            {
              email: "demo1@example.com",
              password: "password",
            },
            {
              // ローカルの状態変更については、コンポーネント内でしたいのでmutateでonSuccessを定義する
              onSuccess: () => navigate("/todo"),
              onError: (error) => console.log(error),
            }
          )
        }
      >
        ログイン
      </button>
    </div>
  );
};

export default LoginPage;
