import RegisterForm from "./components/RegisterForm/RegisterForm";
import styles from "./index.module.css";
import RegisterHeader from "./components/Header/RegisterHeader";

const RegisterPage = () => {
  return (
    <>
      <div className={styles.container}>
        <RegisterHeader />
        <h1>新規登録ページ</h1>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
