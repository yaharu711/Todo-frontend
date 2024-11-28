import { toast } from "react-toastify";
import { useLogin } from "../../../api/User/hooks";

const LoginForm = () => {
  const loginMutation = useLogin();
  return (
    <div>
      <button
        onClick={() => {
          loginMutation.mutate(
            {
              email: "demo1@example.com",
              password: "password",
            },
            {
              onSuccess: () =>
                toast("ログインに成功しました！✅", {
                  progressStyle: {
                    background:
                      "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
                  },
                }),
            }
          );
        }}
      >
        ログイン
      </button>
    </div>
  );
};

export default LoginForm;
