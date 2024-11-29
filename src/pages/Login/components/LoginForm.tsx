import { toast } from "react-toastify";
import { useLogin } from "../../../api/User/hooks";
import styles from "./LoginForm.module.css";
import Button from "../../../components/Button";
import FadeLoaderOverlapedAll from "../../../components/FadeLoaderOverlapedAll";

const LoginForm = () => {
  const { mutate: loginMutate, isPending } = useLogin();
  return (
    <>
      {isPending && <FadeLoaderOverlapedAll />}
      <div className={styles.container}>
        <p>ログインは誰でもできるようになっています</p>
        <Button
          onClick={() => {
            loginMutate(
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
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
