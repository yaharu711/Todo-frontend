import { NavLink } from "react-router-dom";
import Logo from "../../../../components/Logo/Logo";
import { ROUTE_PATHS } from "../../../../routes/paths";
import styles from "./RegisterHeader.module.css";

const RegisterHeader = () => {
  return (
    <div className={styles.header}>
      <Logo href={ROUTE_PATHS.root} />
      <div className={styles.regist_link}>
        <NavLink to={ROUTE_PATHS.login}>ログイン</NavLink>
      </div>
    </div>
  );
};
export default RegisterHeader;
