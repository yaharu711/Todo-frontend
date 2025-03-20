import { IoSettingsOutline } from "react-icons/io5";
import IconButton from "../../../../components/IconButton";
import useHeaderViewModel from "./useHeaderViewModel";
import styles from "./Header.module.css";

const Header = () => {
  const { onClickSettingButon } = useHeaderViewModel();
  return (
    <div className={styles.container}>
      <IconButton onClick={onClickSettingButon}>
        <IoSettingsOutline size={30} style={{ color: "var(--color-icon)" }} />
      </IconButton>
    </div>
  );
};

export default Header;
