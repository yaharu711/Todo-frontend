import { IoMenu } from "react-icons/io5";
import IconButton from "../../../../components/IconButton";
import useHeaderViewModel from "./useHeaderViewModel";
import styles from "./Header.module.css";
import MenuModalPortal from "./components/MenueModalPortal";
import { IoSettingsOutline } from "react-icons/io5";
import Button from "../../../../components/Button";
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
        <div className={styles.content}>
          <Button
            onClick={() => changeIsOpen(false)}
            style={{
              position: "absolute",
              top: "38px",
              right: "38px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0",
              width: "auto",
              height: "auto",
            }}
          >
            ✖︎
          </Button>
          <div className={styles.menue_wrap}>
            <IconButtonWithLabel
              onClick={onClickSettingMenue}
              iconComponent={
                <IoSettingsOutline
                  size={30}
                  style={{ color: "var(--color-icon)" }}
                />
              }
              label="アプリ設定"
            />
            <IconButtonWithLabel
              onClick={onClickCompletedTodoMenue}
              iconComponent={
                <CgPlayListCheck
                  size={35}
                  style={{ color: "var(--color-icon)" }}
                />
              }
              label="完了済みTodo"
            />
          </div>
        </div>
      </MenuModalPortal>
    </div>
  );
};

export default Header;
