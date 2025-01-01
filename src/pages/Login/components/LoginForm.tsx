import { toast } from "react-toastify";
import { useLogin } from "../../../api/User/hooks";
import styles from "./LoginForm.module.css";
import Button from "../../../components/Button";
import FadeLoaderOverlapedAll from "../../../components/FadeLoaderOverlapedAll";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TextInput from "../../../components/TextInput";

const LoginForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFrom401 = searchParams.get("isFrom401");
  const isReload = searchParams.get("isReload");

  useEffect(() => {
    if (isFrom401 && !isReload) {
      // isReloadをtrueに設定し、リロードを実行
      searchParams.set("isReload", "true");
      // クエリパラメータを更新→以下はreload()が走る前に一回useEffectが実行されトースト表示されてしまう
      // よって、useEffectでは[]を指定して最初のレンダリング時のみ処理するようにしている
      setSearchParams(searchParams);
      window.location.reload();
    } else if (isFrom401 && isReload) {
      // リロード後にトーストを表示
      toast.error("セッションが切れました。再度ログインしてください");
      // クエリパラメータを削除して状態をリセット
      const params = new URLSearchParams(searchParams);
      params.delete("isFrom401");
      params.delete("isReload");
      // 現在のurlをクエリパラメータがない状態に書き換える
      window.history.replaceState({}, "", `${window.location.pathname}`);
    }
  }, []);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { mutate: loginMutate, isPending } = useLogin(setError);

  // demo1@example.com
  // passowrd
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutate(
      {
        email: email,
        password: password,
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
  };

  return (
    <>
      {isPending && <FadeLoaderOverlapedAll />}
      <div className={styles.container}>
        {error.length !== 0 && <span className={styles.error}>{error}</span>}
        <form className={styles.form} onSubmit={onSubmit}>
          <TextInput
            label="メールアドレス"
            placeholder=""
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="パスワード"
            placeholder=""
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" style={{ width: 150 }}>
            ログイン
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
