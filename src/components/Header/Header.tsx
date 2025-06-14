import { IoMenu } from "react-icons/io5";
import IconButton from "../IconButton";
import useHeaderViewModel from "./useHeaderViewModel";
import styles from "./Header.module.css";
import MenuModalPortal from "./components/MenueModalPortal";
import { IoSettingsOutline } from "react-icons/io5";
import IconButtonWithLabel from "./components/IconButtonWithLabel";
import { CgPlayListCheck } from "react-icons/cg";
import { Link } from "react-router-dom";

const Header = () => {
  const {
    isLoading,
    onLoad,
    isOpen,
    changeIsOpen,
    onClickSettingMenue,
    onClickCompletedTodoMenue,
  } = useHeaderViewModel();
  return (
    <div className={styles.container}>
      <Link className={styles.logo_wrap} to="/todos">
        {isLoading && (
          <div
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#444",
            }}
          />
        )}
        <img
          src="https://todo-laravel-react.s3.ap-northeast-1.amazonaws.com/icon-40x40.svg"
          alt="ロゴ"
          onLoad={() => {
            onLoad();
          }}
        />
        <span className={styles.logo_label}>Todoアプリ</span>
      </Link>
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
