import styles from "./Header.module.css";
import HumbergerMenue from "../../../../components/HumbergerMenue/HumbergerMenue";
import Logo from "../../../../components/Logo/Logo";

const Header = () => {
  return (
    <div className={styles.container}>
      <Logo />
      <HumbergerMenue />
    </div>
  );
};

export default Header;
