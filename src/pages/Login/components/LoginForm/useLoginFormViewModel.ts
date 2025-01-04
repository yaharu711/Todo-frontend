import { useState } from "react";
import { useCheckLogined, useLogin } from "../../../../api/User/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UseLoginFormViewModel = () => {
  const { data, isPending: isPendingForCheckLogined } = useCheckLogined();
  const navigate = useNavigate();
  // ログイン状態ならログイン後の画面に遷移する
  if (!isPendingForCheckLogined && data?.is_logined) {
    navigate("/todos");
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const { mutate: loginMutate, isPending: isPendingForLogin } =
    useLogin(setError);
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

  return {
    email,
    password,
    error,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    isPendingForLogin,
    isPendingForCheckLogined,
  };
};

export default UseLoginFormViewModel;
