// import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div>
      <h1>ログインページ</h1>
      {message && <div>{message}</div>}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
