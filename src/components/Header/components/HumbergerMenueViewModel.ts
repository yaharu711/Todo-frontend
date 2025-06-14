import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useHumbergerMenueViewModel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeIsOpen = (open: boolean) => setIsOpen(open);
  const navigate = useNavigate();

  const onClickSettingMenue = () => {
    changeIsOpen(false);
    setTimeout(() => {
      navigate("/settings");
    }, 400); // アニメーションが終わる頃に遷移
  };

  const onClickCompletedTodoMenue = () => {
    changeIsOpen(false);
    setTimeout(() => {
      navigate("/todos/completed");
    }, 300);
  };

  return {
    isOpen,
    changeIsOpen,
    onClickSettingMenue,
    onClickCompletedTodoMenue,
  };
};

export default useHumbergerMenueViewModel;
