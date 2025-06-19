import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../api/User/hooks";

const useHumbergerMenueViewModel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeIsOpen = (open: boolean) => setIsOpen(open);
  const navigate = useNavigate();
  const { mutate: logoutMutate } = useLogout();

  const onClickSettingMenue = () => {
    changeIsOpen(false);
    navigate("/settings");
  };

  const onClickCompletedTodoMenue = () => {
    changeIsOpen(false);
    navigate("/todos/completed");
  };

  const onClickLogoutMenue = () => {
    changeIsOpen(false);
    logoutMutate();
  };

  return {
    isOpen,
    changeIsOpen,
    onClickSettingMenue,
    onClickCompletedTodoMenue,
    onClickLogoutMenue,
  };
};

export default useHumbergerMenueViewModel;
