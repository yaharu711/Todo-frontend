import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useHeaderViewModel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const onLoad = () => {
    setIsLoading(false);
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeIsOpen = (open: boolean) => setIsOpen(open);
  const navigate = useNavigate();

  const onClickSettingMenue = () => {
    changeIsOpen(false);
    setTimeout(() => {
      navigate("/settings");
    }, 300); // アニメーションが終わる頃に遷移
  };

  const onClickCompletedTodoMenue = () => {
    changeIsOpen(false);
    setTimeout(() => {
      navigate("/todos/completed");
    }, 300);
  };

  return {
    isLoading,
    onLoad,
    isOpen,
    changeIsOpen,
    onClickSettingMenue,
    onClickCompletedTodoMenue,
  };
};

export default useHeaderViewModel;
