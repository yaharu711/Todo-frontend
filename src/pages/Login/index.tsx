import ClipLoaderOverlapedAll from "../../components/ClipLoaderOverlapedAll";
import LoginForm from "./components/LoginForm/LoginForm";
import styles from "./index.module.css";
import useLoginPageViewModel from "./useLoginPageViewModel";
import SocialLogin from "./components/SocialLogin/SocialLogin";
import LoginHeader from "./components/Header/LoginHeader";

const LoginPage = () => {
  const { isPendingForCheckLogined } = useLoginPageViewModel();
  return (
    <div className={styles.container}>
      <LoginHeader />
      <h1>ログイン</h1>
      {isPendingForCheckLogined ? (
        <ClipLoaderOverlapedAll />
      ) : (
        <>
          <LoginForm />
          <SocialLogin />
        </>
      )}
    </div>
  );
};

export default LoginPage;
