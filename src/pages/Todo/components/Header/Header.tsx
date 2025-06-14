import { IoMenu } from "react-icons/io5";
import IconButton from "../../../../components/IconButton";
import useHeaderViewModel from "./useHeaderViewModel";
import styles from "./Header.module.css";
import MenuModalPortal from "./components/MenueModalPortal";
import { IoSettingsOutline } from "react-icons/io5";
import IconButtonWithLabel from "./components/IconButtonWithLabel";
import { CgPlayListCheck } from "react-icons/cg";

const Header = () => {
  const {
    isOpen,
    changeIsOpen,
    onClickSettingMenue,
    onClickCompletedTodoMenue,
  } = useHeaderViewModel();
  return (
    <div className={styles.container}>
      <IconButton onClick={() => changeIsOpen(true)}>
        <IoMenu size={35} style={{ color: "var(--color-icon)" }} />
      </IconButton>
      <MenuModalPortal isOpen={isOpen} changeIsOpen={changeIsOpen}>
        <IconButtonWithLabel
          onClick={onClickSettingMenue}
          iconComponent={
            <IoSettingsOutline
              size={30}
              style={{ color: "var(--color-icon)" }}
            />
          }
          label="アプリ設定"
          width="150px"
        />
        <IconButtonWithLabel
          onClick={onClickCompletedTodoMenue}
          iconComponent={
            <CgPlayListCheck size={35} style={{ color: "var(--color-icon)" }} />
          }
          label="完了済みTodo"
          width="200px"
        />
      </MenuModalPortal>
    </div>
  );
};

export default Header;
