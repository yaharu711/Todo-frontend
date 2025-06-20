import styles from "./LoginForm.module.css";
import Button from "../../../../components/Button";
import ClipLoaderOverlapedAll from "../../../../components/ClipLoaderOverlapedAll";
import TextInput from "../../../../components/TextInput";
import UseLoginFormViewModel from "./useLoginFormViewModel";

const LoginForm = () => {
  const {
    email,
    password,
    error,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    isPendingForLogin,
  } = UseLoginFormViewModel();

  return (
    <>
      {isPendingForLogin && <ClipLoaderOverlapedAll />}
      <div className={styles.container}>
        {error.length !== 0 && <span className={styles.error}>{error}</span>}
        <form className={styles.form} onSubmit={onSubmit}>
          <TextInput
            label="メールアドレス"
            placeholder=""
            name="email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            autoFocus={true}
          />
          <TextInput
            label="パスワード"
            placeholder=""
            name="password"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
          <Button type="submit" style={{ width: "100%" }}>
            ログイン
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
