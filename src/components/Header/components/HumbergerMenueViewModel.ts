import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useHumbergerMenueViewModel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeIsOpen = (open: boolean) => setIsOpen(open);
  const navigate = useNavigate();

  const onClickSettingMenue = () => {
    changeIsOpen(false);
    navigate("/settings");
  };

  const onClickCompletedTodoMenue = () => {
    changeIsOpen(false);
    navigate("/todos/completed");
  };

  return {
    isOpen,
    changeIsOpen,
    onClickSettingMenue,
    onClickCompletedTodoMenue,
  };
};

export default useHumbergerMenueViewModel;
