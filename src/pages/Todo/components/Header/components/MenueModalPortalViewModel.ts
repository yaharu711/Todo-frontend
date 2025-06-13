import { useNavigate } from "react-router-dom";

const MenueModalPortalViewModel = (changeIsOpen: (open: boolean) => void) => {
  const navigate = useNavigate();
  const onClickSetting = () => {
    changeIsOpen(false);
    setTimeout(() => {
      navigate("/settings");
    }, 300); // アニメーションが終わる頃に遷移
  };

  return {
    onClickSetting,
  };
};

export default MenueModalPortalViewModel;
