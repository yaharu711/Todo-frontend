import { NavLink } from "react-router-dom";
import Logo from "../../../../components/Logo/Logo";
import { ROUTE_PATHS } from "../../../../routes/paths";
import styles from "./LoginHeader.module.css";

const LoginHeader = () => {
  return (
    <div className={styles.header}>
      <Logo href={ROUTE_PATHS.root} />
      <div className={styles.regist_link}>
        <NavLink to={ROUTE_PATHS.regist}>新規登録</NavLink>
      </div>
    </div>
  );
};
export default LoginHeader;
