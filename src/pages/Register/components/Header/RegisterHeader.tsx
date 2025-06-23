import { NavLink } from "react-router-dom";
import Logo from "../../../../components/Logo/Logo";
import styles from "./RegisterHeader.module.css";

const RegisterHeader = () => {
  return (
    <div className={styles.header}>
      <Logo href={"/"} />
      <div className={styles.regist_link}>
        <NavLink to="/login">ログイン</NavLink>
      </div>
    </div>
  );
};
export default RegisterHeader;
