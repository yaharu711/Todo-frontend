import { IoLogOutOutline, IoMenu } from "react-icons/io5";

import { IoSettingsOutline } from "react-icons/io5";
import { CgPlayListCheck } from "react-icons/cg";
import IconButton from "../IconButton/IconButton";
import MenuModalPortal from "../MenueModalPortal/MenueModalPortal";
import IconButtonWithLabel from "../IconButtonWithLabel/IconButtonWithLabel";
import useHumbergerMenueViewModel from "./HumbergerMenueViewModel";

const HumbergerMenue = () => {
  const {
    isOpen,
    changeIsOpen,
    onClickSettingMenue,
    onClickCompletedTodoMenue,
    onClickLogoutMenue,
  } = useHumbergerMenueViewModel();

  return (
    <>
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
        <IconButtonWithLabel
          onClick={onClickLogoutMenue}
          iconComponent={
            <IoLogOutOutline size={30} style={{ color: "var(--color-icon)" }} />
          }
          label="ログアウト"
          width="200px"
        />
      </MenuModalPortal>
    </>
  );
};

export default HumbergerMenue;
