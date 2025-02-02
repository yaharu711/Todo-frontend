import { useState } from "react";
import { useLogin } from "../../../../api/User/hooks";
import { showSuccessToast } from "../../../../util/CustomToast";

const UseLoginFormViewModel = () => {
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
        onSuccess: () => showSuccessToast("ログインに成功しました✅"),
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
  };
};

export default UseLoginFormViewModel;
