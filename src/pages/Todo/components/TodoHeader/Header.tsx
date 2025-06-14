import styles from "./Header.module.css";
import HumbergerMenue from "../../../../components/Header/components/HumbergerMenue";
import Logo from "../../../../components/Header/components/Logo";

const Header = () => {
  return (
    <div className={styles.container}>
      <Logo />
      <HumbergerMenue />
    </div>
  );
};

export default Header;
