import { NavLink } from "react-router-dom";
import Logo from "../../../../components/Logo/Logo";
import styles from "./LoginHeader.module.css";

const LoginHeader = () => {
  return (
    <div className={styles.header}>
      <Logo href={"/"} />
      <div className={styles.regist_link}>
        <NavLink to="/regist">新規登録</NavLink>
      </div>
    </div>
  );
};
export default LoginHeader;
