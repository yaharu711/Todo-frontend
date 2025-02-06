import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import styles from "./RegisterForm.module.css";
import useRegisterFormViewModel from "./RegisterFormViewModel";

const RegisterForm = () => {
    const {
        name,
        onChangeName,
        email,
        onChangeEmail,
        password,
        onChangePassword,
        passwordConfirmation,
        onChangePasswordConfirmation,
        onSubmit,
        inputError,
    } = useRegisterFormViewModel();
    return (
        <>
        {/* {isPendingForLogin && <FadeLoaderOverlapedAll />} */}
        <div>
          {/* {error.length !== 0 && <span className={styles.error}>{error}</span>} */}
          <form className={styles.form} onSubmit={onSubmit}>
            <TextInput
              label="名前"
              placeholder=""
              name="name"
              type="text"
              value={name}
              onChange={onChangeName}
              autoFocus={true}
              errorMessage={inputError.name}
            />
            <TextInput
              label="メールアドレス"
              placeholder=""
              name="email"
              type="email"
              value={email}
              onChange={onChangeEmail}
              autoFocus={true}
              errorMessage={inputError.email}
            />
            <TextInput
              label="パスワード"
              placeholder=""
              name="password"
              type="password"
              value={password}
              onChange={onChangePassword}
              errorMessage={inputError.password}
            />
            <TextInput
              label="パスワード確認"
              placeholder=""
              name="password_confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={onChangePasswordConfirmation}
              errorMessage={inputError.passwordConfirmation}
            />
            <Button type="submit" style={{ width: 150 }}>
              登録
            </Button>
          </form>
        </div>
      </>
    );
}

export default RegisterForm;
