import { NavLink } from "react-router-dom";
import FadeLoaderOverlapedAll from "../../components/FadeLoaderOverlapedAll";
import LoginForm from "./components/LoginForm/LoginForm";
import styles from "./index.module.css";
import useLoginPageViewModel from "./useLoginPageViewModel";

const LoginPage = () => {
  const { isPendingForCheckLogined } = useLoginPageViewModel();
  return (
    <>
      <div className={styles.container}>
        <h1>ログインページ</h1>
        {isPendingForCheckLogined ? <FadeLoaderOverlapedAll /> : <LoginForm />}
      </div>
      <div className={styles.link_container}>
        <NavLink to="/regist" color="var(--color-thema)">
          新規登録ページへ
        </NavLink>
      </div>
    </>
  );
};

export default LoginPage;
