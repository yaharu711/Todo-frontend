import { IoMenu } from "react-icons/io5";
import IconButton from "../../../../components/IconButton";
import useHeaderViewModel from "./useHeaderViewModel";
import styles from "./Header.module.css";
import MenuModalPortal from "./components/MenueModalPortal";

const Header = () => {
  const { isOpen, changeIsOpen } = useHeaderViewModel();
  return (
    <div className={styles.container}>
      <IconButton onClick={() => changeIsOpen(true)}>
        <IoMenu size={35} style={{ color: "var(--color-icon)" }} />
      </IconButton>
      <MenuModalPortal isOpen={isOpen} changeIsOpen={changeIsOpen} />
    </div>
  );
};

export default Header;
