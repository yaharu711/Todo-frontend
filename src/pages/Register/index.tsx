import { NavLink } from "react-router-dom";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import styles from "./index.module.css";

const RegisterPage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>新規登録ページ</h1>
        <RegisterForm />
      </div>
      <div className={styles.link_container}>
        <NavLink to="/login" color="var(--color-thema)">
          ログインページへ
        </NavLink>
      </div>
    </>
  );
};

export default RegisterPage;
