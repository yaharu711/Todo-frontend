import { useLogin } from "../../../api/User/hooks";

const LoginForm = () => {
  const loginMutation = useLogin();
  return (
    <div>
      <button
        onClick={() =>
          loginMutation.mutate({
            email: "demo1@example.com",
            password: "password",
          })
        }
      >
        ログイン
      </button>
    </div>
  );
};

export default LoginForm;
