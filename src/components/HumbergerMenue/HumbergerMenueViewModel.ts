import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/paths";
import { useLogout } from "../../api/User/hooks";

const useHumbergerMenueViewModel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeIsOpen = (open: boolean) => setIsOpen(open);
  const navigate = useNavigate();
  const { mutate: logoutMutate } = useLogout();

  const onClickSettingMenue = () => {
    changeIsOpen(false);
    navigate(ROUTE_PATHS.settings);
  };

  const onClickCompletedTodoMenue = () => {
    changeIsOpen(false);
    navigate(ROUTE_PATHS.todosCompleted);
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
