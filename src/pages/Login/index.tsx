import LoginForm from "./components/LoginForm";
import styles from "./index.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1>ログインページ</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
